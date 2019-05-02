<template>
    <div class="row">
        <div class="col-lg-6">
            <canvas :id="'chart-' + index" class="chart"> </canvas>
        </div>
        <div class="col-lg-6">
            <table class="table table-borderless table-sm">
                <thead class="thead-light">
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Вариант ответа
                        </th>
                        <th>
                            Ответов
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index, key) in variants" :key="key">
                        <td>
                            {{ numbers[index] }}
                        </td>
                        <td>
                            {{ item }}
                        </td>
                        <td>
                            {{ answers[index] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    name: "chart",
    props: ["variants", "answers", "index"],
    data() {
        return {};
    },
    computed: {
        numbers() {
            let array = [];
            for (let i in this.variants) {
                array.push(parseInt(i) + 1);
            }
            return array;
        },
        union() {
            let array = [];
            for (let v in this.variants) {
                array.push({
                    variant: this.variants[v],
                    value: this.answers[v]
                });
            }
            return array;
        }
    },
    mounted() {
        const ctx = document.getElementById("chart-" + this.index);
        const myChart = new Chart(ctx, {
            type: "horizontalBar",
            data: {
                labels: this.numbers,
                datasets: [
                    {
                        label: "",
                        data: this.answers,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },

            options: {
                legend: { display: false },
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                    ]
                }
            }
        });
    }
};
</script>

<style scoped>
.chart {
    max-width: 500px;
    margin: 10px auto;
}
</style>
