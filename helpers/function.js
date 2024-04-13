function uploadImage(event) {
  const input = event.target;
  const file = input.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("image", file);
    // Gửi yêu cầu tải lên ảnh đến server
    $.ajax({
      url: "../upload.php",
      type: "POST",
      data: formData,
      processData: false, // Không xử lý dữ liệu thành chuỗi query
      contentType: false, // Không thiết lập header Content-Type
      dataType: "html", // Kiểu dữ liệu trả về từ server là JSON
      success: function (data) {
        console.log(data);
      },
      error: function (xhr, status, error) {
        // Xử lý các trường hợp lỗi khi gửi yêu cầu tải lên ảnh đến server
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra khi tải lên ảnh.");
      },
    });
    const reader = new FileReader();
    const previewImage = document.getElementById("previewImage");

    reader.onload = function (e) {
      previewImage.src = e.target.result; // Cập nhật src của thẻ img
    };

    reader.readAsDataURL(file); // Đọc tệp ảnh và chuyển đổi thành URL dữ liệu
  }
}
