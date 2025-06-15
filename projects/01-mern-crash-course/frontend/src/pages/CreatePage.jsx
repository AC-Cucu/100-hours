import { Container, Heading, Box, useColorModeValue, VStack, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  const { createProduct } = useProductStore()

  const handleNewProduct = async() => {
    console.log("Creating New Product:", newProduct);

    const { success, message } = await createProduct(newProduct)
    console.log("Success:", success)
    console.log("Message:", message)
  }

  return (
   <Container maxW={"container.sm"} marginTop={10}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create new product
        </Heading>

        <Box 
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme="blue" w={"full"} onClick={handleNewProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
   </Container>
  )
}

export default CreatePage