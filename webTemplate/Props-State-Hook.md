## Nhóm 1 – Nhận diện Props / State / Hook trong code

1. (Nhận diện) Trong `BookItem.jsx`, tham số của component là `({ book, onDelete })`.
a. Đây là Props hay State? Giải thích ngắn vì sao.[^1]
b. `book` và `onDelete` được truyền xuống từ component nào?
2. (Nhận diện) Trong `BookList.jsx`, đoạn code:[^3]

```jsx
const [books, setBooks] = useState([]);
```

a. Đây là Props hay State?
b. Giá trị khởi tạo của `books` là gì và có ý nghĩa gì?
3. (Nhận diện) Trong `App.jsx`, đoạn:[^4]

```jsx
const [ready, setReady] = useState(false);
```

a. Biến `ready` đang lưu trữ điều gì trong vòng đời ứng dụng?
b. Nếu không có State `ready` mà render luôn `Routes`, điều gì có thể xảy ra với dữ liệu?
4. (Nhận diện) Trong `BookForm.jsx`, hãy liệt kê tất cả các State chính được khai báo bằng `useState` và mô tả ngắn mục đích của từng State (ví dụ: `book`, `errors`, ...).[^2]

***

## Nhóm 2 – Câu hỏi trắc nghiệm về Props / State / useState

5. (MCQ) Câu nào đúng về Props và State trong các component trên?
A. `book` trong `BookItem` là State vì nó có thể thay đổi trong component đó.[^1]
B. `books` trong `BookList` là Props vì nó được truyền từ App.[^3][^4]
C. `errors` trong `BookForm` là State dùng để lưu lỗi form.[^2]
D. `ready` trong `App` là Props do `react-router-dom` cung cấp.[^4]
6. (MCQ) Về `useState`, câu nào đúng với code trong `BookForm.jsx`?[^2]
A. `setBook` cập nhật State ngay lập tức và giá trị `book` luôn thay đổi tức thì sau mỗi lần gọi.
B. `book` là một object, nên khi update phải tạo object mới thay vì chỉnh trực tiếp object cũ.
C. `book` chỉ có thể là kiểu chuỗi, không được phép là object.
D. `useState` chỉ được gọi bên ngoài function component.
7. (MCQ) Về `useState` trong `BookList.jsx`, đoạn `const [books, setBooks] = useState([]);` cho ta điều gì?[^3]
A. `books` là một biến toàn cục dùng chung cho mọi component.
B. Mỗi lần `BookList` render, `books` được reset về `[]`.
C. `books` là State riêng của mỗi instance `BookList`, khởi tạo là mảng rỗng.
D. `setBooks` chỉ có thể gọi đúng một lần trong suốt vòng đời component.

***

## Nhóm 3 – Câu hỏi về useEffect và vòng đời component

8. (Giải thích) Trong `App.jsx`, giải thích vai trò của đoạn `useEffect`:[^4]

```jsx
useEffect(() => {
  const existing = localStorage.getItem('books');
  if (!existing) {
    localStorage.setItem('books', JSON.stringify(booksData));
  }
  setReady(true);
}, []);
```

a. Tại sao dependency array lại là `[]`?
b. Nếu bỏ `[]`, mà không truyền đối số thứ hai, effect này sẽ chạy bao nhiêu lần và hậu quả gì?
9. (Giải thích) Trong `BookList.jsx`, `useEffect` được dùng để nạp dữ liệu từ `localStorage`:[^3]

```jsx
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('books')) || [];
  setBooks(stored);
}, []);
```

a. Khi người dùng reload trang, `books` sẽ có giá trị gì sau khi effect chạy?
b. Nếu thay `[]` bằng `[books]`, có nguy cơ gì (vòng lặp vô hạn, hành vi bất thường, hay bình thường)?
10. (MCQ) Về `useEffect` trong `BookForm.jsx`:[^2]

```jsx
useEffect(() => {
  if (editMode && id) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const found = books.find(b => b.id === id);
    if (found) setBook({ ...found, password: '', confirm: '' });
  }
}, [editMode, id]);
```

Câu nào đúng:
A. Effect này chỉ chạy một lần duy nhất khi app load.
B. Effect chạy lại khi `editMode` hoặc `id` thay đổi.
C. Effect không bao giờ chạy nếu `editMode` là `false`.
D. Effect chỉ chạy khi bấm nút submit trong form.
11. (Tình huống) Nếu ta quên thêm `id` vào dependency array (chỉ còn `[editMode]`), hãy mô tả một bug cụ thể có thể xảy ra khi người dùng chỉnh sửa hai cuốn sách khác nhau liên tiếp.[^2]

***

## Nhóm 4 – Thực hành suy luận từ Props và State

12. (Đọc code, đoán hành vi) Trong `BookList.jsx`, hàm xoá sách:[^3]

```jsx
const handleDelete = id => {
  if (window.confirm('Xác nhận xóa sách này?')) {
    const updated = books.filter(b => b.id !== id);
    localStorage.setItem('books', JSON.stringify(updated));
    setBooks(updated);
  }
};
```

a. Vì sao phải gọi cả `localStorage.setItem` và `setBooks` mà không chỉ gọi một trong hai?
b. Nếu chỉ gọi `localStorage.setItem` mà không `setBooks`, UI sẽ hiển thị như thế nào?
13. (Đọc code, Props) Mô tả cách `BookList` truyền dữ liệu và callback xuống `BookItem`:
a. `BookItem` cần những Props nào để hiển thị thông tin sách và xử lý xóa?[^1][^3]
b. Nếu muốn thêm chức năng “Xem chi tiết” bằng nút bấm trong `BookItem`, em sẽ đề xuất thêm Props gì?
14. (Tự luận) Trong `BookForm.jsx`, tại sao tác giả lại tạo `updatedBook` không chứa trường `password` và `confirm` khi lưu:[^2]

```jsx
const updatedBook = {
  id: editMode ? id : Date.now().toString(),
  title: book.title,
  author: book.author,
  year: parseInt(book.year),
  category: book.category,
  pages: parseInt(book.pages)
};
```

Hãy liên hệ điều này với việc thiết kế State `book` ban đầu có thêm `password` và `confirm`.

***

## Nhóm 5 – Câu hỏi thiết kế + mở rộng

15. (Thiết kế) Giả sử muốn thêm chức năng “lọc sách theo năm xuất bản” ngay trong `BookList.jsx`:[^3]
a. Em sẽ thêm bao nhiêu State mới, đó là những State gì?
b. Em sẽ đặt `useEffect` ở đâu, với dependency là gì, để khi thay đổi filter thì danh sách hiển thị cập nhật?
16. (Thiết kế) Hiện tại `App.jsx` dùng `ready` để đợi khởi tạo `localStorage` từ `booksData`. Hãy đề xuất một cách khác dùng `useEffect` và State để:[^4]
    - Vừa nạp dữ liệu,
    - Vừa hiển thị thông báo “Đang tải dữ liệu sách…” trong một khoảng thời gian tối thiểu (ví dụ 1 giây) trước khi render nội dung chính.
17. (Gộp kiến thức) Hãy mô tả lại “luồng dữ liệu” từ lúc người dùng:
    - Mở form thêm sách mới (route `/add`),
    - Nhập dữ liệu và submit trong `BookForm`,
    - Cho đến khi sách mới hiển thị trong bảng `BookList`.
Khi mô tả hãy chỉ rõ: chỗ nào dùng Props, chỗ nào dùng State, chỗ nào dùng `useEffect`, chỗ nào dùng `localStorage`.[^4][^2][^3]

***

<div align="center">⁂</div>

[^1]: BookItem-2.jsx

[^2]: BookForm.jsx

[^3]: BookList-3.jsx

[^4]: App-4.jsx

