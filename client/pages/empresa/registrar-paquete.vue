<template>
  <div>
    <nav aria-label="breadcrumb" class="p-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Main</li>
        <li class="breadcrumb-item active" aria-current="page">
          Registrar Paquete
        </li>
      </ol>
    </nav>
    <div id="app">
      <v-app id="inspire">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-7 mx-auto">
              <h3 class="display-2 text-center">Registro de paquetería</h3>
              <form @submit.prevent="savePaqueteria()">
                <div class="form-group mb-3">
                  <label
                    ><span style="color: red">*</span> Numero de tracking</label
                  >
                  <input
                    v-model="tracking"
                    type="text"
                    required=""
                    @keyup="valid('tracking')"
                    class="form-control rounded-pill border-0 shadow px-4"
                  />
                  <label v-show="error.tracking" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label
                    ><span style="color: red">*</span> Descripción del
                    paquete</label
                  >
                  <input
                    v-model="description"
                    type="text"
                    required=""
                    @keyup="valid('description')"
                    class="form-control rounded-pill border-0 shadow px-4"
                  />
                  <label v-show="error.description" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label><span style="color: red">*</span> Precio</label>
                  <input
                    v-model="precio"
                    type="text"
                    required=""
                    @keyup="valid('precio')"
                    class="form-control rounded-pill border-0 shadow px-4"
                  />
                  <label v-show="error.precio" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label><span style="color: red">*</span> Cantidad</label>
                  <input
                    v-model="cantidad"
                    type="text"
                    required=""
                    @keyup="valid('cantidad')"
                    class="form-control rounded-pill border-0 shadow px-4"
                  />
                  <label v-show="error.cantidad" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label
                    ><span style="color: red">*</span> Posición en el
                    almacén</label
                  >
                  <v-select
                    v-model="almacen"
                    :items="itemsAlmacen"
                    :item-text="'name_almacen'"
                    :item-value="'id_almacen'"
                    label="Posición en el
                    almacén"
                    attach
                    dense
                    filled
                    rounded
                    solo
                    @change="valid('almacen')"
                  ></v-select>
                  <label v-show="error.almacen" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label><span style="color: red">*</span> Cliente</label>
                  <v-select
                    v-model="cliente"
                    :items="itemsClients"
                    :item-text="'full_name'"
                    :item-value="'id_user'"
                    label="Cliente"
                    attach
                    dense
                    filled
                    rounded
                    solo
                    @change="valid('cliente')"
                  ></v-select>
                  <label v-show="error.cliente" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label><span style="color: red">*</span> Sucursal</label>
                  <v-select
                    v-model="sucursal"
                    :items="itemsSucursal"
                    :item-text="'name_sucursal'"
                    :item-value="'id_sucursal'"
                    label="Sucursal"
                    attach
                    dense
                    filled
                    rounded
                    solo
                    @change="valid('sucursal')"
                  ></v-select>
                  <label v-show="error.sucursal" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm font-weight-bold"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </v-app>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  layout: "empresa",
  data() {
    return {
      error: {
        tracking: true,
        description: true,
        precio: true,
        cantidad: true,
        cliente: true,
        sucursal: true,
        almacen: true,
      },
      tracking: "",
      description: "",
      precio: "",
      cantidad: "",
      cliente: "",
      sucursal: "",
      almacen: "",
      itemsAlmacen: [],
      itemsClients: [],
      itemsSucursal: [],
    };
  },
  async fetch() {
    let responseAlmacen = await axios.get(
      `${process.env.baseURL}/api/get/almacen`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
      }
    );
    this.itemsAlmacen = responseAlmacen.data.data;
    let responseClients = await axios.get(
      `${process.env.baseURL}/api/get/clients`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
      }
    );
    this.itemsClients = responseClients.data.data;
    let responseSucursal = await axios.get(
      `${process.env.baseURL}/api/get/sucursal`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
      }
    );
    this.itemsSucursal = responseSucursal.data.data;
  },
  methods: {
    valid(value) {
      if (value == "precio" || value == "cantidad") {
        if (!Number.isNaN(+this[value]) && this[value] != "")
          this.error[value] = false;
        else this.error[value] = true;
      } else {
        if (this[value] !== "") this.error[value] = false;
        else this.error[value] = true;
      }
    },
    async savePaqueteria() {
      if (!Object.values(this.error).every((e) => e === false)) return;
      let model = {
        tracking: this.tracking,
        description: this.description,
        price: this.precio,
        quantity: this.cantidad,
        almacen_position: this.almacen,
        client: this.cliente,
        sucursal: this.sucursal,
      };
      let response = await axios({
        url: "/api/inventory/paquete",
        method: "post",
        baseURL: process.env.baseURL,
        data: model,
      });
      if (response.data.success) {
        Swal.fire({
          title: "Paquete creado con éxito",
          icon: "success",
        });
        this.error = {
          tracking: true,
          description: true,
          precio: true,
          cantidad: true,
          cliente: true,
          sucursal: true,
          almacen: true,
        };
        this.tracking = "";
        this.description = "";
        this.precio = "";
        this.cantidad = "";
        this.cliente = "";
        this.sucursal = "";
        this.almacen = "";
      } else {
        Swal.fire({
          title: "Ocurrio un error al crear el paquete",
          icon: "error",
        });
      }
      console.log(response);
    },
  },
};
</script>

<style></style>
