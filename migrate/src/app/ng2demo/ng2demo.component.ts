import { Component, OnInit, Inject , forwardRef, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { hexafy_SERVICE } from "../services/hexafy";
//import { HeaderComponent } from 'ui-component-lib';

import { TestService } from '../test.service';

declare var Highcharts: any;

@Component({
  selector: 'app-ng2demo',
  template: `
    <h3>Angular 2 Demo Component</h3>
    <app-header></app-header>
  `,
  styleUrls: ['./ng2demo.component.css']
})
export class Ng2demoComponent implements OnInit {

    @Input() data:string;
    @Input() visible:boolean;
    @Output() contentChanged = new EventEmitter<string>();

  constructor(@Inject(forwardRef(() => hexafy_SERVICE)) private hexafyService: any, private testservice: TestService) { }
//constructor(private testservice: TestService) { }

  ngOnInit() {
    this.hexafyService.myFunc();
    //this.testservice.data = 'changed';
  }

   ngAfterViewInit() {
        // this.renderChart();
       console.log(this.data);
       console.log(this.testservice.data);
       this.testservice.visible = !this.testservice.visible 
        this.contentChanged.emit();
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.data.currentValue + 'in ng5');
        
    }
    
  renderChart (){
  	Highcharts.chart('chart', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});

  }
}
