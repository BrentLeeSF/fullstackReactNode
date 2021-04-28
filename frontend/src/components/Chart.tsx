import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import styled from 'styled-components';

defaults.global.maintainAspectRatio = false;

const Styles = styled.div`
  	.canvas-container {
  		height: 60vh;
	}
`;


const Chart = (props: any) => {
		const {companyInfo} = props;
		let yearmonth: Array<string>;
		let monthlysales: Array<string>;
		let name: string = '';
		
		if(companyInfo[0] !== undefined) {
			name = companyInfo[0].name;
			const parsedCompany = JSON.parse(companyInfo[0].sales);

			let combinedResult: any = [];
			parsedCompany.forEach(function (obj: any) {
    			if (!parsedCompany[obj.yearmonth]) {
        			parsedCompany[obj.yearmonth] = {id: obj.id, yearmonth: obj.yearmonth, monthlysales: 0 };
        			combinedResult.push(parsedCompany[obj.yearmonth]);
    			}
    			parsedCompany[obj.yearmonth].monthlysales += obj.monthlysales;
			}, Object.create(null));
			
			yearmonth = combinedResult.map((a: any) => a.yearmonth);
			monthlysales = combinedResult.map((a: any) => a.monthlysales.toFixed(2));
		} else {
			yearmonth = [];
			monthlysales = [];		
		}
		
		let borderColors: Array<string> = [];
		borderColors = Array(20).fill('rgba(36, 79, 35, 1)');

		const data = {

			labels: yearmonth,
			fontSize: '16',
			datasets: [
				{
					label: 'Sales Per Month',
					data: monthlysales,
					fill: false,
					borderColor: borderColors, 
					backgroundColor: borderColors, 
					pointBackgroundColor: borderColors, 
					pointBorderColor: borderColors,
				}
			]
		}

		const options = {
			title: {
				display: true,
				maintainAspectRatio: false,
				text: `${name} - Monthly Sales Revenue`,
				fontStyle: 'bold',
              	fontColor: '#000000',
              	fontSize: '16'
			},
			scales: {
				xAxes: [
					{
						ticks: {
							beginAtZero: false,
							autoSkip: true
						},
						 gridLines: {
                            display: false
                        }
					},
					{
						scaleLabel: {
        					display: true,
        					labelString: 'Sales Per Month',
        					fontStyle: 'bold',
              				fontColor: '#000000',
              				fontSize: '16'
      					}
					}
				],
				yAxes: [
					{
						ticks: {
							beginAtZero: false,
							autoSkip: true
						},
						 gridLines: {
                            display: false
                        }
					},
					{
						scaleLabel: {
        					display: true,
        					labelString: 'Sales in Dollars Per Month',
        					fontStyle: 'bold',
              				fontColor: '#000000',
              				fontSize: '16'
      					}
					}
				]
			}
		}

		return (
			<Styles>
				<article className="canvas-container">
    			<Bar data={data} options={options} />
    			</article>
    		</Styles>
  		)
  	
}

export default Chart;

