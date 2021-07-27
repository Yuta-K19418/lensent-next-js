// import { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import { useEffect } from "react";
// import { Layout } from "src/components/layout";
// import { Sidebar } from "src/components/sidebar";
// import GetAllSentenseIds from "src/pages/api/getAllSentenseIds";
// import { SentenseData } from "src/pages/api/getAllSentensesData";
// import GetSentenseData from "src/pages/api/getSentenseData";
// import useSWR from "swr";

// const Sentense: NextPage = (sentenseId: string, {sentenseData}: SentenseData) => {

// 	const fetcher = (url: string) => {
//     return fetch(url, {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
//       },
//     }).then((response) => {
//       return response.json();
//     });
//   };
//   const apiUrl = `${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/${sentenseId}/`;

//   const { data, mutate } = useSWR(apiUrl, fetcher, {
//     initialData: sentenseData,
//   });

//   useEffect(() => {
//     mutate();
//   }, []);

// 	if (!data) {
// 		return (
// 			<Layout>
// 				<div className="flex">
// 					<Sidebar />
// 					<span>...Loading</span>
// 				</div>
// 		</Layout>
// 		);
// 	}

// 	return (
// 		<Layout>
// 				<div className="flex">
// 					<Sidebar />

// 				</div>
// 		</Layout>
// 	);
// }

// export default Sentense;

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const paths = await GetAllSentenseIds();

// 	return {
// 		paths,
// 		fallback: true,
// 	}
// }

// export const getStaticProps: GetStaticProps = async ({params}) => {
// 	const sentenseData = await GetSentenseData(params.sentenseId);

// 	return {
// 		props: {
// 			sentenseId: params.sentenseId,
// 			sentenseData,
// 		},
// 		revalidate: 3,
// 	}
// }
