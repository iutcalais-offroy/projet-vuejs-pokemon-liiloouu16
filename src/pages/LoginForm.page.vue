<script setup>
  import { ref } from "vue";

  //onglet actif
  const tabActive = ref("login");

  //référence du formulaire
  const formRef = ref(null);
  const formData = ref({
    email: "",
    password: "",
    confirmPassword: ""//pour l'inscription
  });

  //règles de validation
  const rules = ref({
    email: [
      { required: true, message: "L'email est requis", trigger: "blur" },
      { type: "email", message: "Format d'email invalide", trigger: "blur" }
    ],
    password: [
      { required: true, message: "Le mot de passe est requis", trigger: "blur" }
    ],
    confirmPassword:[
      {required: true, message: "La confirmation du mot de passe est requise", trigger: "blur"},
      {
        validator: (_, value) => value === formData.value.password,
        message: "Les mots de passe ne correspondent pas",
        trigger: "blur"
      }
    ]
  });

  //validation du formulaire
  const form_ok = ref(true);

  //soumission du formulaire
  const submitForm = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        console.log("Formulaire valide ✅", formData.value);
        form_ok.value = true;
      } else {
        console.log("Erreurs de validation ❌");
        form_ok.value = false;
      }
    });
  };
</script>


<template>

  <div class="form-contener">
  <!-- Formulaire d'inscription -->
  <n-tabs v-model:value="tabActive" type="line" justify-content="center" animated>

    <!-- Onglet de connexion -->
      <n-tab-pane name="login" tab="Connexion">
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
          
          <p v-if="!form_ok" >Formulaire non valide</p>
          
          <a href="#" @click.prevent="tabActive='register'" class="link-connexion">
            Pas de compte ? <span>S'inscrire</span>
          </a>
        </n-form>
      </n-tab-pane>

    <!-- Onglet d'inscription -->
      <n-tab-pane name="register" tab="S'enregistrer">
        <n-form ref="formRef" :model="formData" :rules="rules">
          <n-form-item label="Email" path="email">
            <n-input v-model:value="formData.email" placeholder="Entrez votre email" />
          </n-form-item>
          
          <n-form-item label="Mot de passe" path="password">
            <n-input v-model:value="formData.password" type="password" placeholder="Entrez votre mot de passe" />
          </n-form-item>
          
          <n-form-item label="Confirmer le mot de passe" path="confirmPassword">
            <n-input v-model:value="formData.confirmPassword" type="password" placeholder="Confirmez votre mot de passe"/>
          </n-form-item>
          
          <n-form-item>
            <n-button type="primary" @click="submitForm">S'inscrire</n-button>
          </n-form-item>
          
          <p v-if="!form_ok" >Formulaire non valide</p>
          
          <a href="#" @click.prevent="tabActive= 'login'" class="link-connexion">
            Déjà inscrit ? <span>Se connecter</span>
          </a>
        </n-form>
      </n-tab-pane>
      
    </n-tabs>
  </div>
  </template>



<style scoped>

  .form-contener{
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .link-connexion{
    text-decoration: none;
    color: black;
    transition: color 0.3s ease;
  }

  .link-connexion span{
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .link-connexion:hover{
    color: #3eaf7c;
  }

  .n-button{
    margin-top: -50px;
  }
  
</style>