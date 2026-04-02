<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Đưa ra câu trả lời cho các phần trên.

Dưới đây là gợi ý đáp án ngắn gọn cho từng câu hỏi, bám sát code các file.[^1][^2][^3][^4]

***

## Nhóm 1 – Nhận diện Props / State / Hook

1. 

a. `book` và `onDelete` là Props vì được truyền từ component cha, không được tạo bằng `useState` trong `BookItem`.[^2][^1]
b. Chúng được truyền từ `BookList`, nơi render danh sách `<BookItem book={...} onDelete={...} />` (theo cấu trúc ứng dụng: `BookList` sử dụng `BookItem`).[^1][^2]

2. 

a. `books` là State vì được khai báo bằng `useState([])` trong `BookList`.[^1]
b. Giá trị khởi tạo là mảng rỗng, nghĩa là trước khi `useEffect` nạp dữ liệu từ `localStorage`, danh sách sách mặc định là trống.[^1]

3. 

a. `ready` lưu trạng thái “app đã khởi tạo dữ liệu books trong localStorage xong hay chưa”.[^3]
b. Nếu không dùng `ready` mà render `Routes` ngay, các component con có thể đọc `localStorage` trước khi dữ liệu mẫu `booksData` được nạp, dẫn đến danh sách rỗng hoặc trạng thái không đồng nhất.[^3][^1]

4. Các State trong `BookForm.jsx`:[^4]

- `book`: object chứa dữ liệu form (`title, author, year, category, pages, password, confirm`).
- `errors`: object chứa message lỗi validation cho từng field.
Mục đích: `book` lưu giá trị input người dùng; `errors` lưu lỗi để hiển thị dưới các input.[^4]

***

## Nhóm 2 – Trắc nghiệm Props / State / useState

5. Đáp án đúng: C.[^4]

- A sai: `book` trong `BookItem` là Props, không phải State.[^2]
- B sai: `books` trong `BookList` là State, không phải Props.[^1]
- D sai: `ready` là State được tạo bằng `useState`, không phải Props từ `react-router-dom`.[^3]

6. Đáp án đúng: B.[^4]

- B đúng vì `book` là object, muốn update an toàn cần tạo object mới (cách làm trong `setBook({ ...found, ... })`).[^4]
- A sai: `setBook` là async, không đảm bảo `book` đổi ngay lập tức trong cùng lần render.
- C sai: `useState` có thể chứa object.
- D sai: `useState` phải được gọi bên trong function component, không phải bên ngoài.

7. Đáp án đúng: C.[^1]

- `books` là State riêng của mỗi instance `BookList`, khởi tạo là `[]`, sau đó được `useEffect` set bằng dữ liệu `localStorage`.[^1]

***

## Nhóm 3 – useEffect và vòng đời

8. 

a. Dependency array là `[]` để effect chỉ chạy 1 lần sau lần render đầu tiên (tương đương “componentDidMount”), dùng cho việc khởi tạo `localStorage` rồi set `ready(true)`.[^3]
b. Nếu bỏ `[]`, effect sẽ chạy lại sau mọi lần render, mỗi render lại đọc/ghi `localStorage` và gọi `setReady(true)` gây render lặp lại, hiệu năng kém, có thể vòng lặp khó kiểm soát nếu logic phức tạp hơn.[^3]

9. 

a. Sau khi effect chạy, `books` sẽ nhận giá trị bằng dữ liệu parse từ `localStorage.getItem('books')`, hoặc `[]` nếu không có gì.[^1]
b. Nếu đổi dependency thành `[books]`, mỗi lần `setBooks` chạy thì `books` thay đổi, effect lại chạy, `setBooks` lại được gọi, có nguy cơ tạo vòng lặp vô hạn render nếu giá trị đọc từ `localStorage` khác tham chiếu với `books` hiện tại.[^1]

10. Đáp án đúng: B và C.[^4]

- B đúng: effect chạy lại khi `editMode` hoặc `id` thay đổi.
- C đúng: nếu `editMode` là `false` thì điều kiện `if (editMode && id)` không thỏa, nên phần thân effect không chạy logic nạp sách.
- A sai: vì dependency `[editMode, id]` nên có thể chạy nhiều lần.
- D sai: effect không liên quan trực tiếp nút submit.

11. Nếu quên `id` trong dependency (chỉ `[editMode]`), khi đang ở chế độ edit:[^4]

- Lần đầu edit sách A: effect chạy, `id` là A, `book` được set dữ liệu sách A.
- Sau đó chuyển sang route edit sách B (id thay đổi), nhưng vì `editMode` không đổi, effect không chạy lại; `book` vẫn chứa dữ liệu sách A, form hiển thị sai thông tin.[^4]

***

## Nhóm 4 – Thực hành Props / State

12. 

a. `localStorage.setItem` cập nhật dữ liệu lưu trữ lâu dài cho các lần reload trang; `setBooks(updated)` cập nhật State để UI trong lần chạy hiện tại re-render ngay và hiển thị danh sách mới.[^1]
b. Nếu chỉ gọi `localStorage.setItem` mà không `setBooks`, dữ liệu trong bộ nhớ trình duyệt được cập nhật nhưng State `books` không đổi, nên UI vẫn hiển thị sách cũ cho đến khi reload hoặc mount lại `BookList`.[^1]

13. 

a. `BookList` truyền ít nhất: `book` (object từng cuốn sách) và `onDelete` (hàm nhận `id` để xoá) vào `BookItem`.[^2][^1]
b. Để thêm chức năng “Xem chi tiết”, có thể truyền thêm một Props callback như `onViewDetail` (nhận `id` hoặc `book`) hoặc truyền `navigate` logic từ trên xuống, nhưng tốt hơn là `onView(book.id)` để `BookItem` chỉ cần gọi.[^2][^1]

14. 

- Khi lưu, `updatedBook` không chứa `password` và `confirm` vì đây chỉ là field phục vụ validation của form, không phải dữ liệu domain thực sự của “quyển sách” trong hệ thống.[^4]
- State `book` ban đầu có thêm `password` và `confirm` là để ràng buộc người dùng nhập mật khẩu mạnh và xác nhận khớp; sau khi validate thành công, các thông tin này không cần lưu kèm cùng bản ghi `book` trong `localStorage`.[^4]

***

## Nhóm 5 – Thiết kế / mở rộng

15. 

a. Tối thiểu 1–2 State mới, ví dụ:

- `filterYear` (năm cần lọc).
- Có thể thêm `filteredBooks`, hoặc chỉ dùng `books` + logic filter trong JSX.[^1]
b. Cách 1 (đơn giản, không cần `useEffect`): lọc trực tiếp trong JSX:

```jsx
const visibleBooks = books.filter(b => !filterYear || b.year === filterYear);
```

Nếu muốn dùng `useEffect`, có thể:

```jsx
const [filteredBooks, setFilteredBooks] = useState([]);
useEffect(() => {
  setFilteredBooks(
    books.filter(b => !filterYear || b.year === filterYear)
  );
}, [books, filterYear]);
```

Khi `filterYear` đổi, effect chạy và cập nhật danh sách hiển thị.[^1]

16. 

Một cách khác trong `App.jsx`:[^3]

- Thêm State `loading` (true/false) và có thể thêm `minDelayPassed` để đảm bảo thời gian tối thiểu.
- Pseudo code:

```jsx
const [ready, setReady] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const start = Date.now();
  const existing = localStorage.getItem('books');
  if (!existing) {
    localStorage.setItem('books', JSON.stringify(booksData));
  }
  const elapsed = Date.now() - start;
  const remaining = 1000 - elapsed; // 1s
  setTimeout(() => {
    setReady(true);
    setLoading(false);
  }, remaining > 0 ? remaining : 0);
}, []);
```

- Khi `loading` là true, render “Đang tải dữ liệu sách…”, khi false thì render nội dung chính.[^3]

17. 

- Người dùng mở route `/add`: `App` dùng `Routes` để hiển thị `BookForm` với `editMode={false}` (hoặc mặc định).[^3]
- Trong `BookForm`, State `book` lưu dữ liệu input, `errors` lưu lỗi; đây là State nội bộ, không phải Props.[^4]
- Khi submit, `handleSubmit` validate, sau đó đọc `books` từ `localStorage`, tạo `updatedBook` mới, push vào mảng, `localStorage.setItem(...)`, rồi `navigate('/')` quay về trang danh sách.[^4]
- Route `/` hiển thị `BookList`; `BookList` dùng `useEffect` đọc `books` từ `localStorage` và `setBooks(stored)`, cập nhật State `books`.[^3][^1]
- JSX của `BookList` render bảng, map qua `books` và truyền từng `book` xuống `BookItem` qua Props, nên sách mới vừa thêm sẽ xuất hiện trong bảng.[^2][^1]

Nếu thầy muốn, em có thể viết thêm một “đáp án chi tiết cho sinh viên” với giải thích chậm hơn, hoặc rút gọn lại thành mẫu slide bài giảng. Thầy muốn phiên bản nào để dùng trên lớp?

<div align="center">⁂</div>

[^1]: BookList-3.jsx

[^2]: BookItem-2.jsx

[^3]: App-4.jsx

[^4]: BookForm.jsx

