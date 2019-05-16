
export default {
  validation: {
    user: {
      maxLengthName: 128,
    },
    order: {
      status: ['pending', 'shipping', 'done', 'canceled'],
    },
  },
}
