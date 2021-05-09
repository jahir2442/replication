<template>
  <div class="p-5">
    <h1>Factura</h1>

    <section class="details">
      <span><b>Factura #</b> {{ invoice_number }}</span>
      <span><b>Emitida</b> {{ new Date().toLocaleDateString() }}</span>
    </section>

    <section class="desc">
      <h2>Descripción</h2>
      <p v-html="desc"></p>
    </section>

    <section class="company">
      <h2>Sucursal</h2>
      <p>{{ company.name }}</p>
      <p>
        {{ company.phone }} <br />
        {{ company.mail }}
      </p>
    </section>

    <section class="client">
      <h2>Cliente</h2>
      <p>{{ client.name }}</p>
      <p>{{ client.company }}</p>
    </section>

    <section class="work">
      <h2>Detalle</h2>
      <table>
        <tr>
          <th>N° tracking</th>
          <th>Volumen</th>
          <th>Precio</th>
          <th>Total precio</th>
        </tr>
        <tr v-for="item in work" :key="item.desc">
          <td>{{ item.desc }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.time }}</td>
          <td>{{ currency }}{{ (item.time * rate).toFixed(2) }}</td>
        </tr>
      </table>
    </section>
    <v-btn
      tile
      block
      color="success"
      @click="submitEntregaPaquete(invoice_number)"
    >
      Entregar paquete
    </v-btn>

    <section class="payment"></section>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  layout: "empresa",
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
    let { data: dataUser } = await axios.get(
      `${process.env.baseURL}/api/user/currentUser`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
      }
    );
    let user = dataUser.currentUser.userData;
    let dataFactura = responsePaquete.data.data;
    this.desc = dataFactura.description_paquete;
    this.client = {
      name: dataFactura.full_name,
      company: dataFactura.name_tipo_cuenta,
    };
    this.rate = dataFactura.precio;
    this.invoice_number = dataFactura.id_paquete;
    this.company = {
      name: user.full_name,
      address: "126 Address<br/>Co. Meath",
      phone: user.phone,
      mail: user.email,
    };
    this.work = [
      {
        desc: dataFactura.number_tracking,
        time: dataFactura.volume,
        price: dataFactura.precio,
      },
    ];
  },
  data() {
    return {
      invoice_number: "21001",
      date_issue: "03-Feb-2021",
      date_expire: "03-Mar-2021",
      desc:
        "This invoice covers services provided by Niall Ainsworth for the design, development and deployment of the website site@site.com.",
      company: {
        name: "Niall Ainsworth",
        address: "126 Address<br/>Co. Meath",
        phone: "087 3297222",
        mail: "niallainsworth@gmail.com",
        tax_number: "83007342",
      },
      client: {
        name: "Kevin Smith",
        company: "Clever Company",
      },
      rate: "12.50",
      currency: "€",
      work: [
        {
          desc: "Static site design and dev",
          time: 44,
        },
      ],
    };
  },
  created: function () {
    this.total_time = this.work.reduce((t, i) => t + i.time, 0);
    this.total_cost = this.total_time * this.rate;
  },
  methods: {
    async submitEntregaPaquete(id) {
      let responseCreateFactura = await axios.post(
        `${process.env.baseURL}/api/inventory/paquete-factura`,
        {
          headers: {
            "Set-Cookie": document.cookie,
          },
          data: { id, date: new Date() },
        }
      );
      if (responseCreateFactura.data.success) {
        Swal.fire({
          title: "Paquete entregado con éxito",
          icon: "success",
        });
        await this.$router.push(`/empresa/listado-paquetes`);
      } else {
        Swal.fire({
          title: "Ocurrio un error al procesar el paquete",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style>
h1 {
  font-size: 2em;
  border-bottom: 2px solid #9bdedf;
  margin-bottom: 12px;
  padding-bottom: 12px;
}

h2 {
  font-size: 1.25em;
  text-indent: -0.8em;
  margin-bottom: 0.5em;
}

section {
  padding-left: 1em;
  margin-bottom: 22px;
}

p {
  margin: 0 0 10px;
}

.details {
  display: flex;
  width: 80%;
  padding-left: 0;
  justify-content: space-between;
  margin-bottom: 32px;
}
.details b {
  padding-right: 6px;
}

.company,
.client {
  float: left;
  width: calc(50% - 1em);
}

.work {
  clear: both;
}
.work h2 {
  margin-bottom: 0;
}
.work table {
  text-align: right;
}
.work table td:first-child,
.work table th:first-child {
  text-align: left;
}
.work table th,
.work table td {
  padding-right: 32px;
}
.work table th {
  vertical-align: top;
  padding-top: 0.75em;
  padding-bottom: 0.25em;
}
.work table th span {
  font-weight: 100;
}

.payment {
  border-bottom: 2px solid #9bdedf;
  padding-bottom: 24px;
}
.payment table {
  text-align: left;
}
.payment table th {
  padding-right: 32px;
}
</style>
