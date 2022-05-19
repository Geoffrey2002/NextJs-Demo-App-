import Head from "next/head";

import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>

      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  //fetch data from an APi
  const client = await MongoClient.connect(
    "mongodb+srv://Geoffrey:EJwfsX1Pxyn08dnv@cluster0.ezpqj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },

    revalidate: 1,
  };
}

export default HomePage;
