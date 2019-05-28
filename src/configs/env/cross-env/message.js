const targetRequired = value => `${value} không được trống`

const targetInvalid = value => `${value} không hợp lệ`

const targetNotFound = value => `${value} không tìm thấy`

export default {
  message: {
    success: 'Thành công',
    serverError: 'Lỗi server',
    noPermission: 'Bạn không có quyền thực hiện hành động này',
    apiNotFound: targetNotFound('Api'),
    invalidToken: targetInvalid('Token'),
    invalidParams: targetInvalid('Params'),
    dataNotFound: targetNotFound('Dữ liệu'),
    tokenVerifyFailed: 'Token không hợp lệ',
    notRegisterAccount: 'Chưa đăng ký tài khoản',
    requireAuth: 'Bạn phải đăng nhập để thực hiện hành động này',

    // validation
    nameRequired: targetRequired('Tên'),
    passwordRequired: targetRequired('Mật khẩu'),
    passwordMustLeastAt6: 'Mật khẩu ít nhất 6 ký tự',
    dataExisted: 'Dữ liệu đã tồn tại',
    nameOrPassIncorrect: 'Tên đăng nhập hoặc mật khẩu không đúng',
    nameMustBeAString: 'Tên đăng nhập phải là chuỗi',
    nameMustLessThan128Chars: 'Tên tối đa 128 ký tự',
    passwordMustBeAString: 'Mật khẩu phải là chuỗi',
    userNotFound: 'Người dùng không tìm thấy',
    invalidFBAuthCode: 'Mã xác thực không hợp lệ',
    codeRequired: targetRequired('Code'),

    // Category
    categoryNameRequired: 'Tên danh mục không được trống',
    categoryNotFound: 'Danh mục không tìm thấy',

    // Product
    productNameRequired: 'Tên sản phẩm không được trống',
    productPriceRequired: 'Giá sản phẩm không được trống',
    productQuantityRequired: targetRequired('Số lượng'),
    productNotFound: targetNotFound('Sản phẩm'),

    // Common
    emailRequired: 'Email không được trống',
    phoneRequired: targetRequired('SĐT'),
    passowrdREquired: targetRequired('Mật khẩu'),
    addresssRequired: targetRequired('Dịa chỉ'),
    invalidObjectId: targetInvalid('ID'),
    quantityMustBeANumber: 'Số lượng ko hợp lệ',

    orderNotFound: targetNotFound('Order'),
    cartEmpty: 'Giỏ hàng đang trống',
    statusRequired: targetRequired('Trạng thái'),

    promotionNotFound: targetNotFound('Promotion'),
  },
}
