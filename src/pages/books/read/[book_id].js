import { useRouter } from "next/router";
import { data } from "/src/data";
import Reader from "/src/components/Reader";

const ReadBook = () => {
    const router = useRouter();

    return(
        <>
            {router.query.book_id ? <Reader id={router.query.book_id} book={data.books[router.query.book_id]} /> : null}
        </>
    )
}

export default ReadBook;