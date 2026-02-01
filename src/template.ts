export function getHtmlTemplate(title: string, content: string) {
    return `<!DOCTYPE html>
<html lang="cs" data-bs-theme="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="icon" href="data:;base64,=">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <style>
        :root {
            --tf-primary: #7c5cfc;
            --tf-primary-light: #a78bfa;
            --tf-primary-dark: #5b3fd9;
            --tf-accent: #06d6a0;
            --tf-gradient: linear-gradient(135deg, #7c5cfc 0%, #06d6a0 100%);
            --tf-gradient-subtle: linear-gradient(135deg, rgba(124,92,252,0.15) 0%, rgba(6,214,160,0.08) 100%);
            --tf-bg: #0f0f17;
            --tf-surface: #1a1a2e;
            --tf-surface-light: #22223a;
            --tf-text: #e8e8f0;
            --tf-text-muted: #9595ad;
        }
        body {
            background-color: var(--tf-bg);
            color: var(--tf-text);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow-x: hidden;
        }
        .btn-primary-tf {
            background: var(--tf-gradient);
            border: none;
            color: #fff;
            font-weight: 600;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(124,92,252,0.3);
        }
        .btn-primary-tf:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(124,92,252,0.45);
            color: #fff;
        }
        .btn-outline-tf {
            border: 2px solid var(--tf-primary);
            color: var(--tf-primary-light);
            font-weight: 600;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            background: transparent;
            transition: all 0.3s ease;
        }
        .btn-outline-tf:hover {
            background: rgba(124,92,252,0.1);
            border-color: var(--tf-primary-light);
            color: #fff;
            transform: translateY(-2px);
        }
        .text-gradient {
            background: var(--tf-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .bg-surface {
            background-color: var(--tf-surface);
        }
        .bg-surface-light {
            background-color: var(--tf-surface-light);
        }
        .glow-border {
            border: 1px solid rgba(124,92,252,0.2);
        }
        .text-muted-tf {
            color: var(--tf-text-muted) !important;
        }
        ::selection {
            background: rgba(124,92,252,0.4);
        }
    </style>
</head>
<body>
${content}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}
