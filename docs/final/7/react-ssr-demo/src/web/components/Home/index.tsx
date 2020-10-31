import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { currentBookState } from "../../recoil/atoms/booksAtoms";
import { useRecoilState, useRecoilValueLoadable, useRecoilValue } from "recoil";
import "./index.css";
import axios from "axios";
import { getData } from "../../api/books/api";
const Home = () => {
  const [currentBook, setCurrentBook] = useRecoilState(currentBookState);
  useEffect(() => {
    if (!currentBook || currentBook.length === 0) {
      getData().then((res: any) => {
        console.log(res.data);
        setCurrentBook(res.data);
      });
    }
  }, []);
  return (
    <div className='components-home'>
      <span>
        <NavLink to='/about'>about页面4</NavLink>
      </span>
      <h2>京程一灯</h2>
      <ul>
        {currentBook.map((book: { id: number; title: string }) => (
          <div key={book.id}>
            <button>{book.title}</button>
          </div>
        ))}
      </ul>
    </div>
  );
};
// export function fetchData() {
//   const [currentBook, setCurrentBook] = useRecoilState(currentBookState);
//   getData().then((res: any) => {
//     setCurrentBook(res.data);
//   });
// }
export default Home;
