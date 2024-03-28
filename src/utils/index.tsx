import { Flex, Skeleton, Typography } from "antd";
import { Children } from "react";

const { Text, Paragraph } = Typography;

interface NewsItem {
	url: string;
	image: string;
	title: string;
}

export const EachItems = ({ render, data, className }: any) => (
	<div className={className}>{Children.toArray(data.map((item: any, index: any) => render(item, index)))}</div>
);

export const MainNews = ({ source, author, published, image, title, description, url, loading }: any) => {
	function handleNewsDirection() {
		window.open(url, "_blank");
		const storedNews: NewsItem[] = JSON.parse(window.localStorage.getItem("news") as string) || [];

		const newsItems: any = {
			url,
			image,
			title,
		};

		storedNews.push(newsItems);
		window.localStorage.setItem("news", JSON.stringify(storedNews));
	}

	if (loading) {
		return <Skeleton active paragraph={{ rows: 6 }} />;
	}
	return (
		<div style={{ cursor: "pointer" }} onClick={handleNewsDirection}>
			<img src={image} />
			<Text className="news-source">{source}</Text>
			<Flex vertical gap={20}>
				<Paragraph className="title" ellipsis={{ rows: 2 }}>{title}</Paragraph>
				<Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }} className="desc">
					{description}
				</Paragraph>
				<Flex vertical>
					<Text className="news-items">
						<span style={{ color: "gray" }}>Author :</span> {author}
					</Text>
					<Text className="news-items">
						<span style={{ color: "gray" }}>Published :</span> {published}
					</Text>
				</Flex>
			</Flex>
		</div>
	);
};

export const NewsItems = ({ image, source, title, description, author, published, url, loading }: any) => {
	function handleNewsDirection() {
		window.open(url, "_blank");
		const storedNews: NewsItem[] = JSON.parse(window.localStorage.getItem("news") as string) || [];

		const newsItems: any = {
			url,
			image,
			title,
		};

		storedNews.push(newsItems);
		window.localStorage.setItem("news", JSON.stringify(storedNews));
	}

	if (loading) {
		return <Skeleton active paragraph={{ rows: 3 }} />;
	}
	return (
		<div style={{ cursor: "pointer" }} onClick={handleNewsDirection}>
			<img src={image} />
			<Text style={{ color: "#fff", fontSize: 12 }}>{source}</Text>
			<Flex vertical justify="space-between" style={{ height: 140 }}>
				<Paragraph ellipsis={{ rows: 2 }} className="child-title">
					{title}
				</Paragraph>
				<Paragraph ellipsis={{ rows: 2 }} className="child-desc">
					{description}
				</Paragraph>
				<Text className="info">
					{author} - {published}
				</Text>
			</Flex>
		</div>
	);
};
