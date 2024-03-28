import React, { useEffect, useState } from "react";

import { Header } from "@components";
import { getNews } from "./api/news";
import { MainNews, NewsItems } from "src/utils";
import moment from "moment";
import { Divider } from "antd";
import Head from "next/head";

const bgColor = { backgroundColor: "#8f8f8f" };

const Home: React.FC = () => {
	const [dataNews, setDataNews] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [queryParams, setQueryParams] = useState({
		q: "",
		country: "us",
		apiKey: process.env.NEXT_PUBLIC_API_KEY,
		page: 1,
		pageSize: 100,
	});

	useEffect(() => {
		doQueryData(queryParams);
	}, [queryParams]);

	async function doQueryData(params: any) {
		try {
			setLoading(true);
			const res = await getNews(params);
			const data = res && res.data.articles;
			const filteredDataNews = data.filter(
				(article: any) =>
					article.author !== null &&
					article.content !== null &&
					article.description !== null &&
					article.title !== "[Removed]" &&
					article.urlToImage !== null
			);
			setDataNews(filteredDataNews);
			console.log(filteredDataNews);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	return (
		<>
		<Head>
			<title>Today's News</title>
		</Head>
		<div className="container">
			<Header />
			<Divider style={bgColor} />
			<div className="wrapper parent">
				{dataNews.length > 0 && (
					<>
						<div className="child1">
							<MainNews
								loading={loading}
								url={dataNews[0].url}
								image={dataNews[0].urlToImage}
								title={dataNews[0].title}
								description={dataNews[0].description}
								source={dataNews[0].source.name}
								author={dataNews[0].author}
								published={moment(dataNews[0].publishedAt).format("ddd, DD MMMM YYYY - HH:mm")}
							/>
						</div>

						{dataNews.slice(1, 9).map((item: any, index: any) => (
							<div key={index} className={`box child${index + 2}`}>
								<NewsItems
									loading={loading}
									source={item.source.name}
									url={item.url}
									image={item.urlToImage}
									title={item.title}
									description={item.description}
									author={item.author}
									published={moment(item.publishedAt).format("ddd, DD MMMM YYYY - HH:mm")}
								/>
							</div>
						))}

						<div className="child10">
							<MainNews
								loading={loading}
								url={dataNews[dataNews.length - 1].url}
								image={dataNews[dataNews.length - 1].urlToImage}
								title={dataNews[dataNews.length - 1].title}
								description={dataNews[dataNews.length - 1].description}
								source={dataNews[dataNews.length - 1].source.name}
								author={dataNews[dataNews.length - 1].author}
								published={moment(dataNews[dataNews.length - 1].publishedAt).format("ddd, DD MMMM YYYY - HH:mm")}
							/>
						</div>
					</>
				)}
			</div>
		</div>
		</>
	);
};

export default Home;
