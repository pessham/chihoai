#!/usr/bin/env python3
import os
import re
import glob

def completely_fix_navigation(file_path):
    """Completely fix navigation by removing Tailwind classes and using pure CSS"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if no mobile-menu-button found
        if 'mobile-menu-button' not in content:
            print(f"Skipping {file_path} - no hamburger menu found")
            return False
            
        # Replace the problematic navigation structure
        old_nav_pattern = r'<!-- Desktop Navigation -->\s*<nav class="hidden md:flex nav-menu space-x-8">[^<]*(?:<a[^>]*>[^<]*</a>\s*)*</nav>\s*<!-- Mobile menu button -->\s*<button class="md:hidden p-2" id="mobile-menu-button">[^<]*(?:<svg[^>]*>[^<]*(?:<path[^>]*>[^<]*)*</svg>\s*)*</button>'
        
        new_nav = '''<!-- Desktop Navigation -->
                <nav class="desktop-nav" id="desktop-nav">
                    <a href="../agriculture.html" class="nav-link">農業DX</a>
                    <a href="../tourism.html" class="nav-link">観光業DX</a>
                    <a href="../manufacturing.html" class="nav-link">製造業DX</a>
                    <a href="../blog-list.html" class="nav-link">ブログ一覧</a>
                </nav>

                <!-- Mobile menu button -->
                <button class="mobile-menu-btn" id="mobile-menu-button">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>'''
        
        # Apply replacement
        updated_content = re.sub(old_nav_pattern, new_nav, content, flags=re.DOTALL | re.MULTILINE)
        
        # Also replace mobile navigation div
        old_mobile_pattern = r'<!-- Mobile Navigation -->\s*<div class="md:hidden hidden" id="mobile-menu">[^<]*(?:<div[^>]*>[^<]*(?:<a[^>]*>[^<]*</a>\s*)*</div>\s*)*</div>'
        
        new_mobile = '''<!-- Mobile Navigation -->
                <div class="mobile-nav" id="mobile-menu">
                    <div class="mobile-nav-content">
                        <a href="../agriculture.html" class="mobile-nav-link">農業DX</a>
                        <a href="../tourism.html" class="mobile-nav-link">観光業DX</a>
                        <a href="../manufacturing.html" class="mobile-nav-link">製造業DX</a>
                        <a href="../blog-list.html" class="mobile-nav-link">ブログ一覧</a>
                    </div>
                </div>'''
        
        updated_content = re.sub(old_mobile_pattern, new_mobile, updated_content, flags=re.DOTALL | re.MULTILINE)
        
        # Add comprehensive CSS
        css_fix = '''
        /* Complete navigation fix */
        .desktop-nav {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .mobile-menu-btn {
            display: none;
            padding: 0.5rem;
            background: none;
            border: none;
            cursor: pointer;
        }
        
        .mobile-nav {
            display: none;
            background: white;
            border-top: 1px solid #e5e7eb;
            padding: 0.5rem;
        }
        
        .mobile-nav-content {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        
        .mobile-nav-link {
            display: block;
            padding: 0.75rem 1rem;
            color: #374151;
            text-decoration: none;
            border-radius: 0.375rem;
            transition: all 0.2s;
        }
        
        .mobile-nav-link:hover {
            background: #f9fafb;
            color: #22c55e;
        }
        
        .mobile-nav.show {
            display: block !important;
        }
        
        @media (max-width: 767px) {
            .desktop-nav {
                display: none !important;
            }
            
            .mobile-menu-btn {
                display: block !important;
            }
        }
        
        @media (min-width: 768px) {
            .desktop-nav {
                display: flex !important;
            }
            
            .mobile-menu-btn {
                display: none !important;
            }
            
            .mobile-nav {
                display: none !important;
            }
        }'''
        
        # Insert CSS before closing </style>
        css_insertion_point = r'(\s*)(</style>)'
        updated_content = re.sub(css_insertion_point, css_fix + r'\n\1\2', updated_content)
        
        # Update JavaScript
        js_pattern = r'// Mobile menu toggle[\s\S]*?}\);[\s\S]*?}\);'
        
        new_js = '''// Mobile menu toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    mobileMenu.classList.toggle('show');
                });

                // Close mobile menu when clicking outside
                document.addEventListener('click', function(event) {
                    if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                        mobileMenu.classList.remove('show');
                    }
                });

                // Close mobile menu when clicking on a link
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.remove('show');
                    });
                });
            }
        });'''
        
        updated_content = re.sub(js_pattern, new_js, updated_content, flags=re.DOTALL)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
            
        print(f"Successfully completely fixed {file_path}")
        return True
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Completely fix all article navigation"""
    articles_dir = '/Users/macbookpro/Claude/vive-blog/public/articles'
    html_files = glob.glob(os.path.join(articles_dir, '*.html'))
    
    successful_updates = 0
    total_files = len(html_files)
    
    print(f"Completely fixing navigation in {total_files} HTML files...")
    
    for file_path in sorted(html_files):
        filename = os.path.basename(file_path)
        print(f"Processing {filename}...")
        
        if completely_fix_navigation(file_path):
            successful_updates += 1
    
    print(f"\nCompleted: {successful_updates}/{total_files} files completely fixed")

if __name__ == "__main__":
    main()