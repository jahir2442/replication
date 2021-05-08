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
    console.log(totalSucursales);
    dataDasboard.sucursales = dataDasboard.sucursales.map((d) => {
      return {
        ...d,
        name: d.name_sucursal,
        y: (d.paquetes_sucursal / totalSucursales) * 100,
      };
    });
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
        text: "Monthly Average Temperature",
      },
      subtitle: {
        text: "Source: WorldClimate.com",
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        title: {
          text: "Temperature (°C)",
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
          name: "Tokyo",
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 0, 9, 23.3, 18.3, 13.9, 9.6],
        },
        {
          name: "London",
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 0, 14.2, 10.3, 6.6, 0],
        },
      ],
    });
  },
};
</script>

<style></style>
