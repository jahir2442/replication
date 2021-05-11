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
        <div id="donut-chart"></div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div id="chart-sucursal"></div>
      </div>
      <div class="col-sm-12 text-center">
        <div id="chart-paquetes"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Highcharts from "highcharts";
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
// Initialize exporting module.
Exporting(Highcharts);
export default {
  layout: "empresa",
  async fetch() {
    let responseDashboard = await axios.get(
      `${process.env.baseURL}/api/dashboard/get-data`,
      {
        headers: {
          "Set-Cookie": document.cookie,
        },
      }
    );
    let dataDasboard = {
      donut: responseDashboard.data.data[1],
      sucursales: responseDashboard.data.data[2],
      paquetes: responseDashboard.data.data[3]
    };
    let totalDonut = dataDasboard.donut.reduce((acc, current) => {
      return (acc += current.cantidad_status);
    }, 0);
    dataDasboard.donut = dataDasboard.donut.map((d) => {
      return {
        ...d,
        name: d.name_status,
        y: (d.cantidad_status / totalDonut) * 100,
      };
    });
    let totalSucursales = dataDasboard.sucursales.reduce((acc, current) => {
      return (acc += current.paquetes_sucursal);
    }, 0);
    dataDasboard.sucursales = dataDasboard.sucursales.map((d) => {
      return {
        ...d,
        name: d.name_sucursal,
        y: (d.paquetes_sucursal / totalSucursales) * 100,
      };
    });
    dataDasboard.paquetes =  dataDasboard.paquetes.map((p) => {
         return {
              ...p,
               llegada: new Date(p.fecha_llegada).getMonth(),
               salida: p.fecha_retiro == '' ? undefined : new Date(p.fecha_retiro).getMonth()
         }
    });

    function groupBy(keyName) {
  
      var occurences = dataDasboard.paquetes.reduce(function (r, row) {
          r[row[keyName]] = ++r[row[keyName]] || 1;
          return r;
      }, {});

      var result = Object.keys(occurences).map(function (key)       {
          return { key: key, value: occurences[key] };
      });

      return result;
  }     
  
     let resultLlegada = groupBy("llegada");
     let resultSalida = groupBy("salida");

     let entrada = new Array(12).fill(0);
     let salida =  new Array(12).fill(0);
     resultLlegada.forEach(r => {
          if(r.key != "undefined")
          entrada[+r.key] = r.value
     })
     resultSalida.forEach(r => {
          if(r.key != "undefined")
          salida[+r.key] = r.value
     })
    
    Highcharts.chart("donut-chart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Porcentaje de Paquetes por Estado",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          showInLegend: true
        },
      },
      credits: false,
      series: [
        {
          name: "Porcentaje de estado",
          colorByPoint: true,
          data: dataDasboard.donut,
        },
      ],
    });
    Highcharts.chart("chart-sucursal", {
      chart: {
        type: "column",
      },
      title: {
        text: "Porcentaje total de paquetes por sucursal",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      credits: false,
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "porcentaje de paquetes",
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%",
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },
      credits: false,
      series: [
        {
          name: "Sucursal",
          colorByPoint: true,
          data: dataDasboard.sucursales,
        },
      ],
    });
    Highcharts.chart("chart-paquetes", {
      chart: {
        type: "line",
      },
      title: {
        text: "Estadisticas sobre la entrada y salida de paquetes por mes",
      },
      xAxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
      },
      yAxis: {
        title: {
          text: "Cantidad de paquetes",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Entrada",
          data: entrada
        },
        {
          name: "Salida",
          data: salida,
        },
      ],
    });
  },
};
</script>

<style></style>
