import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const allEvents = [
  {
    title: "Dorofeeva",
    location: "Kyiv, Palace of sports",
    date: new Date("April 22, 2025 19:00"),
    price: 590,
    image: "https://storage.concert.ua/JU9/8/rk/67cc0a5145251/5253.jpg:31-catalog-event_item-desktop2x"
  },
  {
    title: "Solo concert Edwart",
    location: "Lutsk, Lutsk Palace of Culture",
    date: new Date("May 31, 2025 19:00"),
    price: 300,
    image: "https://storage.concert.ua/JU9/15/GN/67d56a086cd64/cd6b.png:31-catalog-event_item-desktop"
  },
  {
    title: "Zhadan i sobaky",
    location: "Lviv, !FESTrepublic territory",
    date: new Date("May 3, 2025 18:00"),
    price: 300,
    image: "https://storage.concert.ua/JU9/31/HP/679c9d97382b5/82b8.jpg:31-catalog-event_item-desktop2x"
  },
  {
    title: "Monatik. Only you can do that.",
    location: "Kyiv, Palace of sports",
    date: new Date("September 20, 2025"),
    price: 490,
    image: "https://storage.concert.ua/JU9/4/e0/67a1d9f8f2c4a/2c4e.jpg:31-catalog-event_item-desktop2x"
  },
  {
    title: "Bez obmezhen",
    location: "Kyiv, Palace of sports",
    date: new Date("May 8, 2025"),
    price: 300,
    image: "https://storage.concert.ua/JU9/12/vZ/67d1c587eef9e/efa1.jpg:31-catalog-event_item-desktop2x"
  }
];

export async function uploadEventsToFirestore() {
  const eventsRef = collection(db, "events");

  for (const event of allEvents) {
    await addDoc(eventsRef, {
      ...event,
      date: event.date.toISOString()
    });
  }

  console.log("Events successfully uploaded.");
}
