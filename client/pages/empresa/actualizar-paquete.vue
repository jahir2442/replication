<template>
  <div>
    <nav aria-label="breadcrumb" class="p-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Listado de Paquetes</li>
        <li class="breadcrumb-item active" aria-current="page">
          Actualizar Paquete
        </li>
      </ol>
    </nav>
    <div id="app">
      <v-app id="inspire">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-7 mx-auto">
              <h3 class="display-2 text-center">Actualizar Paquete</h3>
              <form @submit.prevent="submitUpdate()">
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
                  <label><span style="color: red">*</span> Volumen</label>
                  <input
                    v-model="volumen"
                    type="text"
                    required=""
                    @keyup="valid('volumen')"
                    class="form-control rounded-pill border-0 shadow px-4"
                  />
                  <label v-show="error.volumen" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label
                    ><span style="color: red">*</span> Estado Paquete</label
                  >
                  <v-select
                    v-model="status"
                    :items="itemsStatus"
                    :item-text="'name_status'"
                    :item-value="'id_status'"
                    label="Cliente"
                    attach
                    dense
                    filled
                    rounded
                    solo
                    @change="valid('status')"
                  ></v-select>
                  <label v-show="error.cliente" style="color: red">
                    Campo requerido
                  </label>
                </div>
                <div class="form-group mb-3">
                  <label><span style="color: red">*</span> Cliente</label>
                  <v-select
                    v-model="cliente"
                    :items="itemsClients"
                    :item-text="'full_name_cuenta'"
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
                <div class="form-group mb-3">
                  <label
                    ><span style="color: red">*</span> Posición en la
                    sucursal</label
                  >
                  <v-select
                    v-model="almacen"
                    :items="itemsAlmacen"
                    :item-text="'name_almacen'"
                    :item-value="'id_almacen'"
                    label="Posición en la sucursal"
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
        tracking: false,
        description: false,
        volumen: false,
        cliente: false,
        sucursal: false,
        almacen: false,
        status: false,
      },
      tracking: "",
      description: "",
      volumen: "",
      cliente: "",
      sucursal: "",
      almacen: "",
      status: "",
      itemsAlmacen: [],
      itemsClients: [],
      itemsSucursal: [],
      itemsStatus: [],
    };
  },
  async fetch() {
    let id = atob(this.$router.currentRoute.query.id);
    if (!id) await this.$router.push(`/empresa/listado-paquetes`);

    let responsePaquete = await axios.get(
      `${process.env.baseURL}/api/inventory/paquete`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
        params: { id },
      }
    );

    if (!responsePaquete.data.success)
      return await this.$router.push(`/empresa/listado-paquetes`);
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
    let responseStatus = await axios.get(
      `${process.env.baseURL}/api/get/status-paquete`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
      }
    );
    this.itemsStatus = responseStatus.data.data.filter((s) => s.id_status != 3);

    let dataDB = responsePaquete.data.data;
    this.id_paquete = dataDB.id_paquete;
    this.tracking = dataDB.number_tracking;
    this.description = dataDB.description_paquete;
    this.volumen = dataDB.volume;
    this.cliente = dataDB.id_user;
    this.sucursal = dataDB.id_sucursal;
    this.almacen = dataDB.id_almacen;
    this.status = dataDB.status_paquete;
  },
  methods: {
    valid(value) {
      if (value == "volumen") {
        if (!Number.isNaN(+this[value]) && this[value] != "")
          this.error[value] = false;
        else this.error[value] = true;
      } else {
        if (this[value] !== "") this.error[value] = false;
        else this.error[value] = true;
      }
    },
    async submitUpdate() {
      if (!Object.values(this.error).every((e) => e === false)) return;
      let model = {
        id: this.id_paquete,
        tracking: this.tracking,
        description: this.description,
        volume: this.volumen,
        status_paquete: this.status,
        client: this.cliente,
        sucursal: this.sucursal,
        almacen_position: this.almacen,
      };
      let response = await axios(
        {
          url: "/api/inventory/paquete",
          method: "patch",
          baseURL: process.env.baseURL,
          data: model,
        },
        {
          headers: {
            "Set-Cookie": document.cookie,
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          title: "Paquete actualizado con éxito",
          icon: "success",
        });
        await this.$router.push(`/empresa/listado-paquetes`);
      } else {
        Swal.fire({
          title: "Ocurrio un error al crear el paquete",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style></style>
