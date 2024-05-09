<?php
function monthToSpanish($month)
{
    //param in number
    $meses = [
        1 => 'Enero',
        2 => 'Febrero',
        3 => 'Marzo',
        4 => 'Abril',
        5 => 'Mayo',
        6 => 'Junio',
        7 => 'Julio',
        8 => 'Agosto',
        9 => 'Septiembre',
        10 => 'Octubre',
        11 => 'Noviembre',
        12 => 'Diciembre',
    ];
    return $meses[$month];
}

function formatCurrency($amount)
{
    //Format to $ 1,000.00
    return '$' . number_format($amount, 2);
}

function formatDate($date)
{
    return date('d-m-Y', strtotime($date));
}

?>

<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
        }

        table {
            font-family: 'DejaVu Sans', sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        .table {
            border-collapse: collapse;
            width: 100%;
            padding-bottom: 10px;
        }

        .table td,
        .table th {
            border: 1px solid #ddd;
            padding: 4px 2px;
            font-size: 10px;
        }

        .table tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .table tr:hover {
            background-color: #ddd;
        }

        .table th {
            background-color: #4a4a4a;
            color: white;
        }

        .table:last-child {
            margin-bottom: 0px;
        }

        .small-text {
            font-size: 12px;
        }

        .text-center {
            text-align: center;
        }

        .text-left {
            text-align: left;
        }
    </style>
</head>

<body>

    <h3 class="text-center">
        Registro de gastos
    </h3>

    <h5 style="padding: 0;  margin: 0;">
        {{ $category->name }}
    </h5>



    {{-- For earch payments_by_year_by_month --}}
    @foreach ($payments_by_year_by_month as $year => $payments_by_month)
        @foreach ($payments_by_month as $month)
            <h6 style="margin: 10px 0;">
                {{ monthToSpanish($month->month) }} - {{ $year }}
            </h6>
            <table class="table">
                <tr>
                    <th class="text-center">Fecha</th>
                    <th class="text-left">Nota</th>
                    <th class="text-center">Monto</th>
                </tr>




                @foreach ($month->payments as $payment)
                    <tr>
                        <td style="width: 70px;" class="text-center">{{ formatDate($payment->date) }}</td>
                        <td>{{ $payment->notes }}</td>
                        <td style="width: 100px;" class="text-center">{{ formatCurrency($payment->amount) }}</td>
                    </tr>
                @endforeach
                {{-- totAL --}}
                <tr>
                    <td></td>
                    <td><strong>Total</strong></td>
                    <td style="text-width: 100px;" class="text-center">
                        <strong>{{ formatCurrency($month->payments->sum('amount')) }}</strong>
                    </td>
                </tr>

            </table>
        @endforeach
    @endforeach

    <div style="text-align: right; margin-top: 30px; font-size: 15px;">
        <strong>Total acomulado: {{ formatCurrency($category->total) }}</strong>
    </div>
</body>

</html>
