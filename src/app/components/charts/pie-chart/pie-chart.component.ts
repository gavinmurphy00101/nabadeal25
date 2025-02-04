import { Component, Input, OnInit } from '@angular/core';
import { Color, DataItem, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CustomDataItem } from 'src/app/interfaces/commonObjects.modals';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class PieChartComponent  implements OnInit {

  @Input() dataItemArray : DataItem[] = [];
  @Input() colorArray: string[] | undefined;

  domain: string[] = [];
  originalDataItems: DataItem[] = [];
  customDataItemArray: CustomDataItem[] = [];
  view: [number, number] = [700, 400];
  gradient = false;
  showLegend = true;
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

  public onSelect(event: any) {
    //popup alert
    console.log(event);
  }

  private async getCustomDataArray() : Promise<CustomDataItem[]> {
    let result: Array<CustomDataItem> = [];
    this.dataItemArray?.forEach( (item: DataItem, index) => {
      let customDataItem: any = { ...item, color: this.colorArray ? this.colorArray[index] : '#AAAAAA' };
      result.push(customDataItem);
      this.domain.push(customDataItem.color);
    });
    this.domain.push('#AAAAAA');
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  private setResponsiveView() {
    if (window.innerWidth < 768) {
      this.view = [window.innerWidth - 40, 300]; // Adjust for mobile
    } else {
      this.view = [700, 400]; 
    }
  }

  
}
