<template>
  <div>
    <nav aria-label="breadcrumb" class="p-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Main</li>
        <li class="breadcrumb-item active" aria-current="page">Dasboard</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-sm-12 col-md-6">
        <v-btn class="mt-3" block color="error" elevation="2" @click="logout()"
          >Cerrar Sessión</v-btn
        >
      </div>
      <div class="col-sm-12 col-md-6"></div>
      <div class="col-sm-12 col-md-6"></div>
      <div class="col-sm-12 col-md-6"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empresa",
};
</script>

<style></style>
