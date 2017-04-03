var dataJson = [];

generatePpmChart = function(array) {
  //Definicao da linha de PPM Target
  const plotLineOptions = {
    id: 'ppmTarget',
    value: 42000,
    color: 'black',
    dashStyle: 'solid',
    width: 2,
    label: {
      text: '42000',
      align: 'right',
      style: {
        color: 'black',
        fontWeight: 'bold'
      }
    }
  }

  //Definicao do grafico
  let myChart = Highcharts.chart('container', { chart: {
        type: 'column'
    },
    title: {
        text: 'PPM - QFY',
        style: {
          fontWeight: 'bold'
        }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
            fontSize: '13px',
            color: 'black',
            fontFamily: 'Verdana, sans-serif',
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: null
      },
      plotLines:[plotLineOptions]
    },
    plotOptions: {

    },
    series: [
      {
        name: 'PPM Monthly Average',
        data: [
          ['2015', 2145000],
          ['2016', 1054100],          
        ],
        
        color: '#0D47A1'
      },
      {
        name: 'Monthly PPM',
        data: array,
        color: '#2196F3'
      },
      {
        color: 'black',
        name: 'PPM Target',
        dashStyle: 'solid',
        marker: {
          enabled: false
        },
        events: {
          legendItemClick: function(e) {
            if(this.visible) {
              this.chart.yAxis[0].removePlotLine('ppmTarget')
            } else {
              this.chart.yAxis[0].addPlotLine(plotLineOptions)
            }
          }
        }
      }
    ]
  })
}

$(document).ready(function(){
    var ListaSP
    var month = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}
    ListaSP = $().SPServices.SPGetListItemsJson({
        webUrl: "http://share.embraer.com.br/qualidade/fornecedor/",
        listName: "KPI_PPM_QFY",
        CAMLViewFields: "<ViewFields>" +
            "<FieldRef Name ='Title' />" +
            "<FieldRef Name ='PPM' />" +
            "<FieldRef Name ='Mes'/>" +
            "<FieldRef Name ='Ano' />" +
            "</ViewFields>" 
    });

    $.when(ListaSP).done(function(){
      dataJson = this.data
      console.log(dataJson);
      //**********************************************//
      let arrayItem = []
      let mainArray = []

      for (var i = 0; i < dataJson.length; i++) { 
        if(dataJson[i].Ano == "2017"){
          arrayItem.push(month[dataJson[i].Mes])
          arrayItem.push(dataJson[i].PPM)
          mainArray.push(arrayItem)
          arrayItem = []
        }
      }
      generatePpmChart(mainArray)
    })
})
