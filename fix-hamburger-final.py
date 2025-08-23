#!/usr/bin/env python3
"""
Final hamburger menu fix for all articles
Based on the working 20250822.html template
"""

import os
import re
import glob

def fix_hamburger_menu(file_path):
    """Fix hamburger menu implementation for a single article file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already fixed (check for our specific pattern)
        if 'id="desktop-nav"' in content and 'aria-label="メニューを開く"' in content:
            print(f"✓ Already fixed: {file_path}")
            return True
        
        # 1. Fix desktop navigation HTML
        desktop_nav_old = r'<!-- Desktop Navigation -->\s*<nav class="[^"]*"[^>]*>[\s\S]*?</nav>'
        desktop_nav_new = '''<!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8" id="desktop-nav">
                    <a href="../agriculture.html" class="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">農業DX</a>
                    <a href="../tourism.html" class="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">観光業DX</a>
                    <a href="../manufacturing.html" class="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">製造業DX</a>
                    <a href="../blog-list.html" class="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">ブログ一覧</a>
                </nav>'''
        
        content = re.sub(desktop_nav_old, desktop_nav_new, content, flags=re.MULTILINE | re.DOTALL)
        
        # 2. Fix mobile menu button
        mobile_btn_old = r'<!-- Mobile menu button -->\s*<button[^>]*id="mobile-menu-button"[^>]*>[\s\S]*?</button>'
        mobile_btn_new = '''<!-- Mobile menu button -->
                <button class="md:hidden p-2 text-gray-600 hover:text-primary" id="mobile-menu-button" aria-label="メニューを開く">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>'''
        
        content = re.sub(mobile_btn_old, mobile_btn_new, content, flags=re.MULTILINE | re.DOTALL)
        
        # 3. Fix mobile navigation HTML - find and replace entire mobile nav section
        mobile_nav_patterns = [
            r'<!-- Mobile Navigation -->\s*<div[^>]*id="mobile-menu"[^>]*>[\s\S]*?</div>\s*</div>',
            r'<div[^>]*mobile-nav[^>]*id="mobile-menu"[^>]*>[\s\S]*?</div>\s*</div>',
            r'<div[^>]*id="mobile-menu"[^>]*>[\s\S]*?</div>\s*(?=</div>)'
        ]
        
        mobile_nav_new = '''<!-- Mobile Navigation -->
            <div class="md:hidden hidden bg-white border-t border-gray-200" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <a href="../agriculture.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">農業DX</a>
                    <a href="../tourism.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">観光業DX</a>
                    <a href="../manufacturing.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">製造業DX</a>
                    <a href="../blog-list.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">ブログ一覧</a>
                </div>
            </div>'''
        
        found_mobile_nav = False
        for pattern in mobile_nav_patterns:
            if re.search(pattern, content, flags=re.MULTILINE | re.DOTALL):
                content = re.sub(pattern, mobile_nav_new, content, flags=re.MULTILINE | re.DOTALL)
                found_mobile_nav = True
                break
        
        if not found_mobile_nav:
            # Insert mobile nav after mobile menu button
            button_end = content.find('</button>', content.find('id="mobile-menu-button"'))
            if button_end != -1:
                button_end += len('</button>')
                content = content[:button_end] + '\n            </div>\n\n            ' + mobile_nav_new + content[button_end:]
        
        # 4. Clean up CSS - remove all existing navigation styles and replace with clean version
        css_start = content.find('<style>')
        css_end = content.find('</style>') + len('</style>')
        
        if css_start != -1 and css_end != -1:
            clean_css = '''    <!-- CSS -->
    <style>
        /* Primary color variables */
        :root {
            --primary: #22c55e;
            --primary-dark: #16a34a;
            --primary-light: #dcfce7;
        }
        
        .text-primary {
            color: var(--primary);
        }
        
        .hover\\:text-primary:hover {
            color: var(--primary);
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
        
        /* Author and related articles */
        .author-info {
            border-top: 1px solid #e5e7eb;
            padding-top: 2rem;
        }
        
        .related-articles {
            border-top: 1px solid #e5e7eb;
            padding-top: 2rem;
        }
    </style>'''
            
            content = content[:css_start] + clean_css + content[css_end:]
        
        # 5. Fix JavaScript - replace entire script section
        script_patterns = [
            r'<script>\s*// Mobile menu toggle[\s\S]*?</script>',
            r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\'[\s\S]*?</script>'
        ]
        
        clean_script = '''    <script>
        // Mobile menu toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                // Toggle mobile menu
                mobileMenuButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    mobileMenu.classList.toggle('hidden');
                });

                // Close mobile menu when clicking outside
                document.addEventListener('click', function(event) {
                    if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
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
        
        found_script = False
        for pattern in script_patterns:
            if re.search(pattern, content, flags=re.MULTILINE | re.DOTALL):
                content = re.sub(pattern, clean_script, content, flags=re.MULTILINE | re.DOTALL)
                found_script = True
                break
        
        if not found_script:
            # Insert script before </body>
            body_end = content.rfind('</body>')
            if body_end != -1:
                content = content[:body_end] + '\n' + clean_script + '\n' + content[body_end:]
        
        # Write the fixed content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Fixed: {file_path}")
        return True
        
    except Exception as e:
        print(f"✗ Error fixing {file_path}: {e}")
        return False

def main():
    """Main function to fix all article files"""
    articles_dir = "/Users/macbookpro/Claude/vive-blog/public/articles"
    
    # Get all HTML files in articles directory
    html_files = glob.glob(os.path.join(articles_dir, "*.html"))
    
    if not html_files:
        print("No HTML files found in articles directory")
        return
    
    print(f"Found {len(html_files)} article files")
    print("Applying hamburger menu fix based on 20250822.html template...")
    print("-" * 50)
    
    success_count = 0
    total_count = len(html_files)
    
    for file_path in sorted(html_files):
        filename = os.path.basename(file_path)
        if fix_hamburger_menu(file_path):
            success_count += 1
    
    print("-" * 50)
    print(f"Completed: {success_count}/{total_count} files successfully fixed")
    
    if success_count == total_count:
        print("🎉 All files fixed successfully!")
    else:
        print(f"⚠️ {total_count - success_count} files had issues")

if __name__ == "__main__":
    main()