#!/usr/bin/env python3
import os
import re
import glob

def add_hamburger_menu_to_file(file_path):
    """Add hamburger menu to a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already has hamburger menu
        if 'mobile-menu-button' in content:
            print(f"Skipping {file_path} - already has hamburger menu")
            return False
            
        # Replace navigation section
        old_nav_pattern = r'(\s*)<nav class="nav-menu">\s*.*?</nav>'
        
        new_nav = '''            <!-- Desktop Navigation -->
            <nav class="hidden md:flex nav-menu space-x-8">
                <a href="../agriculture.html" class="nav-link text-gray-700 hover:text-primary transition-colors">農業DX</a>
                <a href="../tourism.html" class="nav-link text-gray-700 hover:text-primary transition-colors">観光業DX</a>
                <a href="../manufacturing.html" class="nav-link text-gray-700 hover:text-primary transition-colors">製造業DX</a>
                <a href="../blog-list.html" class="nav-link text-gray-700 hover:text-primary transition-colors">ブログ一覧</a>
            </nav>

            <!-- Mobile menu button -->
            <button class="md:hidden p-2" id="mobile-menu-button">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <a href="../agriculture.html" class="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">農業DX</a>
                <a href="../tourism.html" class="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">観光業DX</a>
                <a href="../manufacturing.html" class="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">製造業DX</a>
                <a href="../blog-list.html" class="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">ブログ一覧</a>
            </div>
        </div>'''
        
        # Update content
        updated_content = re.sub(old_nav_pattern, new_nav, content, flags=re.DOTALL | re.MULTILINE)
        
        if updated_content == content:
            print(f"No navigation found to replace in {file_path}")
            return False
        
        # Add CSS for mobile menu
        css_addition = '''        
        /* Mobile hamburger menu styles */
        #mobile-menu {
            transition: all 0.3s ease;
        }

        :root {
            --text-primary: #5B47E0;
        }
        
        .text-primary {
            color: var(--text-primary);
        }
        
        .hover\\:text-primary:hover {
            color: var(--text-primary);
        }'''
        
        # Find the end of style section and add CSS
        style_end_pattern = r'(\s*)(</style>)'
        updated_content = re.sub(style_end_pattern, css_addition + r'\n\1\2', updated_content)
        
        # Add JavaScript before closing body tag
        js_code = '''
    <script>
        // Mobile menu toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
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
        
        # Add JS before closing body tag
        updated_content = re.sub(r'(</body>\s*</html>)', js_code + r'\n\1', updated_content)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
            
        print(f"Successfully updated {file_path}")
        return True
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Process all HTML files in articles directory"""
    articles_dir = '/Users/macbookpro/Claude/vive-blog/public/articles'
    html_files = glob.glob(os.path.join(articles_dir, '*.html'))
    
    successful_updates = 0
    total_files = len(html_files)
    
    print(f"Processing {total_files} HTML files...")
    
    for file_path in sorted(html_files):
        filename = os.path.basename(file_path)
        print(f"Processing {filename}...")
        
        if add_hamburger_menu_to_file(file_path):
            successful_updates += 1
    
    print(f"\nCompleted: {successful_updates}/{total_files} files updated successfully")

if __name__ == "__main__":
    main()