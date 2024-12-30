import { useState,useEffect } from "react";

interface QuoteType {
  quote: string;
  author: string;
}

const quotes: QuoteType[] = [
  { quote: "The only way to write is to write.", author: "Stephen King" },
  { quote: "Good writing is supposed to evoke emotion in the reader.", author: "John Gardner" },
  { quote: "The hardest part of writing is getting started.", author: "Stephen King" },
  { quote: "The greatest reward for doing a thing well is to have done it.", author: "Ralph Waldo Emerson" },
  { quote: "Write what you know, that is the heart of good writing.", author: "Ernest Hemingway" },
  { quote: "The writer must become a receptacle that every human emotion can enter without changing its nature.", author: "Rainer Maria Rilke" }
];

export const Quote = () => {
  const [quote, setQuote] = useState<QuoteType | null>(quotes[0]);

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    getRandomQuote(); 
  }, []); 

  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            "{quote?.quote}"
          </div>
          <div className="max-w-md text-xl font-semibold mt-4">{quote?.author}</div>
        </div>
      </div>
    </div>
  );
};
