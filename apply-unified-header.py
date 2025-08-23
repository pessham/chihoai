#!/usr/bin/env python3
"""
Apply unified header structure to all articles based on 20250823.html template
"""

import os
import re
import glob

def apply_unified_header(file_path):
    """Apply unified header structure to a single article file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already has unified header (check for metamake logo)
        if 'metamakeblack.jpg' in content and 'onclick="toggleMobileMenu()"' in content:
            print(f"✓ Already unified: {os.path.basename(file_path)}")
            return True
        
        # 1. Add Tailwind CDN if not present
        if 'cdn.tailwindcss.com' not in content:
            # Find head section and add Tailwind
            head_end = content.find('</head>')
            if head_end != -1:
                tailwind_cdn = '''
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#22c55e',
                        secondary: '#16a34a',
                        accent: '#dcfce7'
                    }
                }
            }
        }
    </script>
'''
                content = content[:head_end] + tailwind_cdn + content[head_end:]
        
        # 2. Replace entire header section with unified structure
        header_pattern = r'<!-- Header -->\s*<header[^>]*>.*?</header>'
        unified_header = '''<!-- Header -->
    <header class="shadow-lg border-b-4 sticky top-0 z-50" style="border-bottom-color: #18634B; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(15px);">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="../index.html" class="flex items-center group">
                    <div class="flex items-center gap-3">
                        <img 
                            src="../images/metamakeblack.jpg" 
                            alt="メタマケロゴ" 
                            class="w-10 h-10 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div class="flex flex-col">
                            <div class="text-xs font-bold text-gray-600 leading-none">metamake</div>
                            <h1 class="text-lg font-black group-hover:scale-105 transition-transform whitespace-nowrap leading-none mt-1" style="color: #000000;">
                                地方<span style="color: #18634B;">AI</span><span style="color: #29D3C3;">ブースター</span>
                            </h1>
                        </div>
                    </div>
                </a>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-6">
                    <a href="../index.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">ホーム</a>
                    <a href="../manufacturing.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">製造業DX</a>
                    <a href="../tourism.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">観光業DX</a>
                    <a href="../agriculture.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">農業DX</a>
                    <a href="../blog-list.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">ブログ一覧</a>
                </nav>
                
                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button
                        type="button"
                        class="rounded-lg p-2 inline-flex items-center justify-center transition-all hover:scale-105"
                        style="background: linear-gradient(135deg, #18634B 0%, #2B8A64 100%); color: #ffffff;"
                        onclick="toggleMobileMenu()"
                    >
                        <span class="sr-only">メニューを開く</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Navigation -->
            <div class="md:hidden hidden bg-white border-t border-gray-200" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <a href="../index.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">ホーム</a>
                    <a href="../manufacturing.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">製造業DX</a>
                    <a href="../tourism.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">観光業DX</a>
                    <a href="../agriculture.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">農業DX</a>
                    <a href="../blog-list.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">ブログ一覧</a>
                    <a href="../index.html#ai-diagnosis" class="block px-3 py-2 text-white rounded-md font-medium transition-colors" style="background: linear-gradient(135deg, #29D3C3 0%, #4DDDD1 100%);">🚀 AI導入診断</a>
                    <a href="../about.html" class="block px-3 py-2 text-white rounded-md font-medium transition-colors" style="background: linear-gradient(135deg, #18634B 0%, #2B8A64 100%);">メタマケについて</a>
                </div>
            </div>
        </div>
    </header>'''
        
        if re.search(header_pattern, content, flags=re.MULTILINE | re.DOTALL):
            content = re.sub(header_pattern, unified_header, content, flags=re.MULTILINE | re.DOTALL)
        else:
            # If no header found, try to find body tag and insert after it
            body_start = content.find('<body')
            if body_start != -1:
                body_end = content.find('>', body_start) + 1
                content = content[:body_end] + '\n    ' + unified_header + content[body_end:]
        
        # 3. Clean up and add unified CSS
        css_start = content.find('<style>')
        css_end = content.find('</style>')
        
        if css_start != -1 and css_end != -1:
            # Replace existing CSS with clean unified version
            unified_css = '''    <style>
        /* Reset any conflicting styles */
        .nav, .nav ul, .nav li, .nav a {
            all: unset;
        }
        
        /* Primary colors */
        :root {
            --primary: #22c55e;
            --primary-dark: #16a34a;
            --primary-light: #dcfce7;
        }
        
        .text-primary {
            color: var(--primary) !important;
        }
        
        .hover\\:text-primary:hover {
            color: var(--primary) !important;
        }
        
        /* Prose styles */
        .prose h2 {
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        
        .prose h3 {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
        }
        
        .prose p {
            margin-bottom: 1rem;
            line-height: 1.7;
        }
        
        .prose ul, .prose ol {
            margin-bottom: 1rem;
        }
        
        .prose li {
            margin-bottom: 0.5rem;
        }
        
        .author-info {
            border-top: 1px solid #e5e7eb;
            padding-top: 2rem;
        }
        
        .related-articles {
            border-top: 1px solid #e5e7eb;
            padding-top: 2rem;
        }
    </style>'''
            
            content = content[:css_start] + unified_css + content[css_end + 8:]
        else:
            # Add CSS before </head>
            head_end = content.find('</head>')
            if head_end != -1:
                content = content[:head_end] + unified_css + '\n    ' + content[head_end:]
        
        # 4. Replace or add unified JavaScript
        script_patterns = [
            r'<script>\s*// Mobile menu toggle[\s\S]*?</script>',
            r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\'[\s\S]*?</script>',
            r'<script>\s*function toggleMobileMenu\(\)[\s\S]*?</script>'
        ]
        
        unified_js = '''    <script>
        // Mobile menu toggle function
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        }
        
        // Initialize mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenu) {
                // Close mobile menu when clicking outside
                document.addEventListener('click', function(event) {
                    const mobileButton = event.target.closest('button[onclick="toggleMobileMenu()"]');
                    if (!mobileButton && !mobileMenu.contains(event.target)) {
                        mobileMenu.classList.add('hidden');
                    }
                });

                // Close mobile menu when clicking on a link
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }
        });
    </script>'''
        
        # Remove any existing mobile menu scripts
        found_script = False
        for pattern in script_patterns:
            if re.search(pattern, content, flags=re.MULTILINE | re.DOTALL):
                content = re.sub(pattern, '', content, flags=re.MULTILINE | re.DOTALL)
                found_script = True
        
        # Add unified script before </body>
        body_end = content.rfind('</body>')
        if body_end != -1:
            content = content[:body_end] + unified_js + '\n' + content[body_end:]
        
        # Write the updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Updated: {os.path.basename(file_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error updating {os.path.basename(file_path)}: {e}")
        return False

def main():
    """Apply unified header to all article files"""
    articles_dir = "/Users/macbookpro/Claude/vive-blog/public/articles"
    
    # Get all HTML files except 20250823.html (our template)
    html_files = [f for f in glob.glob(os.path.join(articles_dir, "*.html")) 
                  if not f.endswith("20250823.html")]
    
    if not html_files:
        print("No HTML files found to update")
        return
    
    print(f"Found {len(html_files)} article files to update")
    print("Applying unified header structure from 20250823.html template...")
    print("-" * 60)
    
    success_count = 0
    total_count = len(html_files)
    
    for file_path in sorted(html_files):
        if apply_unified_header(file_path):
            success_count += 1
    
    print("-" * 60)
    print(f"Completed: {success_count}/{total_count} files successfully updated")
    
    if success_count == total_count:
        print("🎉 All files updated successfully!")
    else:
        print(f"⚠️ {total_count - success_count} files had issues")

if __name__ == "__main__":
    main()