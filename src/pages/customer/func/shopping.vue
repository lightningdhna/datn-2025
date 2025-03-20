<script setup lang="ts">
import type { ProductBrief } from '@/models/product'

const search = ref('')
const lowPrice = ref<string | null>(null)
const highPrice = ref <string | null>(null)

const productList = ref<ProductBrief[]>([
  {
    id: '1',
    name: 'Nước ép  - Cam Ép',
    price: 45000,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQnbr3AR0v4jz4ZXDFhmPSV1zN_Wbae-7qaPHG5D1gKV4b6Wrle4Q-_l9vIpkECzx5W51gJeTsjZRFfYYiMASQJKlVzhSIyZDCGNKvc74Y',
  },
  {
    id: '2',
    name: 'Nước ép - Dứa Ép',
    price: 45000,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTct4QnA6zwU4tyn9vq_ADJ8Ey6RfIWK-6V6g&s',
  },
  {
    id: '3',
    name: 'Nước ép  - Ổi Ép',
    price: 10000,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfn9JN7gVNhckoRVUML4BZwny8r1jDsTaA8Q&s',
  },
  {
    id: '4',
    name: 'Nước ép  - Táo Ép',
    price: 45000,
    imageUrl: 'https://vcdn1-suckhoe.vnecdn.net/2019/09/03/benefitsoflime-1567496996-9070-1567497249.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=LpPndYyqCShHL-Scv4JrJw',
  },
  {
    id: '5',
    name: 'Nước ép - Dưa Hấu Ép',
    price: 60000,
    imageUrl: 'https://thucphamdongxanh.com/wp-content/uploads/2019/07/le.jpeg',
  },
  {
    id: '6',
    name: 'Nước ép  - Chanh Dây Ép',
    price: 45000,
    imageUrl: 'https://product.hstatic.net/200000157781/product/man_do_an_phuoc_8faf83a0b20e4b479fb5cb10a0490421.png',
  },
  {
    id: '7',
    name: 'Nước ép  - Xoài Ép',
    price: 45000,
    imageUrl: 'https://cdn.shopify.com/s/files/1/0272/0107/5560/products/Mango_juice_500ml_540x.jpg?v=1614320136',
  },
  {
    id: '8',
    name: ' Dâu Ép',
    price: 45000,
    imageUrl: 'https://cdn.shopify.com/s/files/1/0272/0107/5560/products/Strawberry_juice_500ml_540x.jpg?v=1614320136',
  },
  {
    id: '9',
    name: ' Việt Quất Ép',
    price: 45000,
    imageUrl: 'https://cdn.shopify.com/s/files/1/0272/0107/5560/products/Blueberry_juice_500ml_540x.jpg?v=1614320136',
  },
  {
    id: '10',
    name: ' Lựu Ép',
    price: 45000,
    imageUrl: 'https://citifruit.com/uploads/images/Products/trai-dao-tuoi-800x600.jpg',
  },
])

const statusMap = new Map<string, string>([
  ['pending', 'Đang chờ xử lý'],
  ['confirmed', 'Đã xác nhận'],
  ['completed', 'Hoàn thành'],
  ['declined', 'Bị từ chối'],
])

const selectedItem = ref<string>('')

const filteredProducts = computed(() => {
  return productList.value.filter((product: ProductBrief) => {
    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesLowPrice = lowPrice.value === null || lowPrice.value === '' || product.price >= Number(lowPrice.value)
    const matchesHighPrice = highPrice.value === null || highPrice.value === '' || product.price <= Number(highPrice.value)

    return matchesSearch && matchesLowPrice && matchesHighPrice
  })
})
</script>

<template>
  <VCardText class="pt-0">
    <VRow style="direction: ltr;">
      <VCol
        cols="12"
        offset-sm="1"
        md="4"
      >
        <VTextField
          v-model="search"
          placeholder="Search ..."
          append-inner-icon="bx-search"
          single-line
          hide-details
          dense
          outlined
        />
      </VCol>
      <VCol
        cols="auto"
        md="2"
        offset-md="2"

        style="flex-grow: 1;"
      >
        <VTextField
          v-model="lowPrice"
          label="Giá thấp nhất"
          prefix="VNĐ"
          type="number"
        />
      </vcol>
      <VCol
        cols="7"
        md="2"
        style="flex-grow: 1;"
      >
        <VTextField
          v-model="highPrice"
          label="Giá cao nhất"
          prefix="VNĐ"
          type="number"
        />
      </vcol>
    </VRow>
  </VCardText>
  <VContainer mb-12>
    <VRow>
      <VCol
        sm="12"
        md="12"
      >
        <VRow>
          <VCol
            v-for="product in filteredProducts"
            :key="product.id"
            sm="6"
            md="3"
          >
            <VCard height="300">
              <VImg
                :src="product.imageUrl"
                height="185"
                width="100%"
              />
              <VCardTitle>{{ product.name }}</VCardTitle>
              <VCardSubtitle>{{ product.price }}đ</VCardSubtitle>
              <VCardActions>
                <VRow
                  justify="end"
                  class="mt-1 "
                >
                  <VBtn
                    icon="bx-info-circle"
                    color="info"
                    class="me-1"
                  />
                  <VBtn
                    :rounded="0"
                    color="success"
                    variant="tonal"
                    prepend-icon="bx-cart-add"
                    class="me-1"
                  >
                    Thêm vào giỏ
                  </VBtn>
                </VRow>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
