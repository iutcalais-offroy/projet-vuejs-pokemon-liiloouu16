<script setup>
  import { ref } from "vue";

  //onglet actif
  const tabActive = ref("login");

  //références des formulaires
  const loginFormRef = ref(null);
  const registerFormRef = ref(null);

  //données des formulaires
  const loginData = ref({ email: "", password: "" });
  const registerData = ref({ email: "", password: "", confirmPassword: "" });

  //règles de validation : inscription
  const registerRules = ref({
    email: [
      { required: true, message: "L'email est requis", trigger: "blur" },
      { type: "email", message: "Format d'email invalide", trigger: "blur" }
    ],
    password: [
      { required: true, message: "Le mot de passe est requis", trigger: "blur" }
    ],
    confirmPassword: [
      { required: true, message: "La confirmation du mot de passe est requise", trigger: "blur" },
      {
        validator: (_, value) => value === registerData.value.password,
        message: "Les mots de passe ne correspondent pas",
        trigger: "blur"
      }
    ]
  });

  //règles de validation : connexion
  const loginRules = ref({
    email: [
      { required: true, message: "L'email est requis", trigger: "blur" },
      { type: "email", message: "Format d'email invalide", trigger: "blur" }
    ],
    password: [{ required: true, message: "Le mot de passe est requis", trigger: "blur" }]
  });

  //appel API : inscription
  const registerUser = async () => {
    registerFormRef.value?.validate(async (valid) => {
      if (valid) {
        try {
          const response = await fetch("https://pokemon-api-seyrinian-production.up.railway.app/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: registerData.value.email,
              password: registerData.value.password
            })
          });
          const data = await response.json();

          if (response.ok) {
            alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
            tabActive.value = "login";
          } else {
            alert("Erreur d'inscription : " + (data.message || "Veuillez réessayer."));
          }
        } catch (error) {
          alert("Erreur de connexion.");
        }
      }
    });
  };

  //appel API : connexion
  const loginUser = async () => {
    loginFormRef.value?.validate(async (valid) => {
      if (valid) {
        try {
          const response = await fetch("https://pokemon-api-seyrinian-production.up.railway.app/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: loginData.value.email,
              password: loginData.value.password
            })
          });
          const data = await response.json();

          if (response.ok) {
            alert("Connexion réussie !");
          } else {
            alert("Erreur de connexion : Identifiants incorrects.");
          }
        } catch (error) {
          alert("Erreur de connexion avec le serveur.");
        }
      }
    });
  };

</script>

<template>
  <div class="form-container">
    <n-tabs v-model:value="tabActive" type="line" justify-content="center" animated>

      <!-- Onglet de connexion -->
      <n-tab-pane name="login" tab="Connexion">
        <n-form ref="loginFormRef" :model="loginData" :rules="loginRules">
          <n-form-item label="Email" path="email">
            <n-input v-model:value="loginData.email" placeholder="Entrez votre email" />
          </n-form-item>
          
          <n-form-item label="Mot de passe" path="password">
            <n-input v-model:value="loginData.password" type="password" placeholder="Entrez votre mot de passe" />
          </n-form-item>
          
          <n-form-item>
            <n-button type="primary" @click="loginUser">Se connecter</n-button>
          </n-form-item>
          
          <a href="#" @click.prevent="tabActive='register'" class="link-connexion">
            Pas de compte ? <span>S'inscrire</span>
          </a>
        </n-form>
      </n-tab-pane>

      <!-- Onglet d'inscription -->
      <n-tab-pane name="register" tab="S'enregistrer">
        <n-form ref="registerFormRef" :model="registerData" :rules="registerRules">
          <n-form-item label="Email" path="email">
            <n-input v-model:value="registerData.email" placeholder="Entrez votre email" />
          </n-form-item>
          
          <n-form-item label="Mot de passe" path="password">
            <n-input v-model:value="registerData.password" type="password" placeholder="Entrez votre mot de passe" />
          </n-form-item>
          
          <n-form-item label="Confirmer le mot de passe" path="confirmPassword">
            <n-input v-model:value="registerData.confirmPassword" type="password" placeholder="Confirmez votre mot de passe"/>
          </n-form-item>
          
          <n-form-item>
            <n-button type="primary" @click="registerUser">S'inscrire</n-button>
          </n-form-item>
          
          <a href="#" @click.prevent="tabActive='login'" class="link-connexion">
            Déjà inscrit ? <span>Se connecter</span>
          </a>
        </n-form>
      </n-tab-pane>
      
    </n-tabs>
  </div>
</template>

<style scoped>
  .form-container {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .link-connexion {
    text-decoration: none;
    color: black;
    transition: color 0.3s ease;
  }

  .link-connexion span {
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .link-connexion:hover {
    color: #3eaf7c;
  }
</style>