import axios from "axios";

export async function getNews(params: any) {
	try {
		let config: any = {
			method: "GET",
			maxBodyLength: Infinity,
			url: `https://newsapi.org/v2/top-headlines`,
			headers: {},
			params: params,
		};
		const response = await axios.request(config);
		return response;
	} catch (error) {
		console.log(error);
	}
}
