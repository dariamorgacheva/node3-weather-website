

//object destructuring

// const dasha = {
//   playsPiano: true,
//   likesCats: false  
// }

// const {playsPiano: justPlays, likes} = dasha
// console.log(justPlays)

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
  rating: 4.2
}

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock)
}

transaction('order:', product)