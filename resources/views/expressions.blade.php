<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="dark:bg-gray-900 antialiased">


    <div class="p-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Expressions</h1>
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Expression
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Youtube URL
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Count
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($expressions as $item)
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <td class="px-6 py-3">
                                    {{ $item['expression'] }}
                                </td>
                                <td class="px-6 py-3">
                                    {{ $item['type'] }}
                                </td>
                                <td class="px-6 py-3">
                                    {{ $item['youtube_url'] }}
                                </td>
                                <td class="px-6 py-3">
                                    {{ $item['count'] }}
                                </td>
                                <td>

                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

            </div>

        </div>
    </div>

</body>

</html>
