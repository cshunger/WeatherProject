/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

package com.sample;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.wink.json4j.utils.XML;
import org.xml.sax.SAXException;

import com.ibm.mfp.adapter.api.OAuthSecurity;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

@Path("/")
@OAuthSecurity(enabled=false)
public class JavaHTTPResource {
	/*
	 * For more info on JAX-RS see https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */


	private static CloseableHttpClient client;
	private static HttpHost mfpHost;
	private static HttpHost weatherHost;
	private static String weatherAPIUsername = "";
	private static String weatherAPIPassword = "";

	public static void init() {
		client = HttpClientBuilder.create().build();
		mfpHost = new HttpHost("mobilefirstplatform.ibmcloud.com", 443, "https");
		weatherHost = new HttpHost("twcservice.mybluemix.net", 80, "http");
	}

	public void execute(HttpHost host, HttpUriRequest req, HttpServletResponse resultResponse)
			throws IOException,
			IllegalStateException, SAXException {
		HttpResponse RSSResponse = client.execute(host, req);
		ServletOutputStream os = resultResponse.getOutputStream();
		if (RSSResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
			resultResponse.addHeader("Content-Type", "application/json");
			//String json = IOUtils.toString(RSSResponse.getEntity().getContent());
			InputStream in = RSSResponse.getEntity().getContent();
			StringBuilder sb=new StringBuilder();
			BufferedReader br = new BufferedReader(new InputStreamReader(in));
			String read;

			while((read=br.readLine()) != null) {
			    //System.out.println(read);
			    sb.append(read);
			}

			br.close();
			os.write(sb.toString().getBytes(Charset.forName("UTF-8")));

		}else{
			resultResponse.setStatus(RSSResponse.getStatusLine().getStatusCode());
			RSSResponse.getEntity().getContent().close();
			os.write(RSSResponse.getStatusLine().getReasonPhrase().getBytes());
		}
		os.flush();
		os.close();
	}

	@GET
	@Produces("application/json")
	public void get(@Context HttpServletResponse response, @QueryParam("tag") String tag)
			throws IOException, IllegalStateException, SAXException {
		if(tag!=null && !tag.isEmpty()){
			execute(mfpHost, new HttpGet("/blog/atom/"+ tag +".xml"), response);
		}
		else{
			execute(mfpHost, new HttpGet("/feed.xml"), response);
		}

	}

	@GET
	@Produces("application/json")
	@Path("/{latitude}/{longitude}")
	public void getWeather(@Context HttpServletResponse response, @PathParam("latitude") float latitude, @PathParam("longitude") float longitude)
			throws IOException, IllegalStateException, SAXException {
		HttpGet request = new HttpGet("/api/weather/v2/observations/current?units=e&geocode="+latitude + ","+ longitude+"&language=en-US");
		String authValue = new String(Base64.encodeBase64((weatherAPIUsername + ":" + weatherAPIPassword).getBytes()));
		request.addHeader("Authorization", authValue);
		execute(weatherHost, request, response);
	}

}
