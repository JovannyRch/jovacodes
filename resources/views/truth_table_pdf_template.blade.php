<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>
        {{ $expression }} - Tabla de verdad
    </title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
        }

        table {
            font-family: 'DejaVu Sans', sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        table td,
        table th {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        table tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        table tr:hover {
            background-color: #ddd;
        }

        table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: center;
            background-color: #FF942B;
            color: white;
        }

        footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 12px;
        }

        .row {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    </style>

</head>

<body>
    <div class="container">
        <h1 class="title">
            {{ $expression }}
        </h1>
        <span>Proposiciones:</span> <b>{{ $variables }}</b> <br> <br>
        <span>Cantidad de proposiciones</span> <br>
        <span>n = </span> <b>{{ $n }}</b>
        <br>
        <br>
        <span>Cantidad de filas</span> <br>
        <div>2<sup>n</sup> = 2<sup>{{ $n }}</sup> = <b>{{ pow(2, $n) }}</b></div>
        <br>
        <table>
            <thead>
                <tr>
                    @foreach ($headers as $header)
                        <th>{{ $header }}</th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @foreach ($body as $row)
                    <tr>
                        @foreach ($row as $cell)
                            <td>{{ $cell == '1' ? 'V' : 'F' }}</td>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>

        <br>
        <span>Tabla de verdad tipo:</span> <b>{{ $type }}</b>

        <br>

        <footer>
            <div class="row">
                <div>
                    <p>Descarga nuestra app móvil</p>
                    {{--  <a href="https://play.google.com/store/apps/details?id=com.jovannyrch.tablasdeverdad" target="_blank">
                        <img src="{{ public_path('images/google-play-badge.png') }}" alt="Google Play Store"
                            width="150">
                    </a> --}}
                </div>
                <div>
                    <img src="{{ public_path('images/qr.png') }}" alt="Tablas de verdad" width="75">
                </div>
            </div>


            <div style="display: flex; justify-content: center; flex-direction: column;">
                <p>www.tablasdeverdad.com</p>
                <p>

                    &copy;
                    {{ date('Y') }}</p>
            </div>
        </footer>
    </div>
</body>

</html>
