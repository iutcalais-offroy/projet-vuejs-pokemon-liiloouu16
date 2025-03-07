<script setup>
  import { ref } from "vue";

  const formRef = ref(null);
  const formData = ref({
    email: "",
    password: ""
  });

  const rules = {
    email: [
      { required: true, message: "L'email est requis", trigger: "blur" },
      { type: "email", message: "Format d'email invalide", trigger: "blur" }
    ],
    password: [{ required: true, message: "Le mot de passe est requis", trigger: "blur" }]
  };

  const submitForm = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log("Formulaire valide ✅", formData.value);
      } else {
        console.log("Erreurs de validation ❌", errors);
      }
    });
  };
</script>


<template>
  <n-form ref="formRef" :model="formData" :rules="rules">
    <n-form-item label="Email" path="email">
      <n-input v-model:value="formData.email" placeholder="Entrez votre email" />
    </n-form-item>

    <n-form-item label="Mot de passe" path="password">
      <n-input v-model:value="formData.password" type="password" placeholder="Entrez votre mot de passe" />
    </n-form-item>

    <n-form-item>
      <n-button type="primary" @click="submitForm">Se connecter</n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>