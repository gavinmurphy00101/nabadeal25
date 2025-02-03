import { Component, Input, OnInit } from '@angular/core';
import { Color, DataItem, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CustomDataItem } from 'src/app/interfaces/commonObjects.modals';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class BarChartComponent  implements OnInit {

  @Input() dataItemArray: DataItem[] = [];
  @Input() colorArray: string[] | undefined;

  domain: string[] = [];
  originalDataItems: DataItem[] = [];
  customDataItemArray: CustomDataItem[] = [];
  view: [number, number] = [700, 400];
  gradient = false;
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = false;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.domain
  };
  

  constructor() { }

  async ngOnInit() {
    this.originalDataItems = this.dataItemArray;
    this.customDataItemArray = await this.getCustomDataArray();
    this.setResponsiveView();
    window.addEventListener('resize', this.setResponsiveView.bind(this));
  }

  private getCustomDataArray(): Promise<CustomDataItem[]> {
    return new Promise((resolve, reject) => {
      try {
        let result: Array<CustomDataItem> = [];
        this.dataItemArray?.forEach((item: DataItem, index) => {
          let customDataItem: CustomDataItem = { ...item, name: item.name.toString(), color: this.colorArray ? this.colorArray[index] : '#AAAAAA' };
          result.push(customDataItem);
          this.domain.push(customDataItem.color);
        });
        this.domain.push('#AAAAAA');
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  private setResponsiveView() {
    if (window.innerWidth < 768) {
      this.view = [window.innerWidth - 40, 300]; // Adjust for mobile
    } else {
      this.view = [700, 400];
    }
  }

  public onSelect(event: any) {
    console.log(event);
  }

 

}
