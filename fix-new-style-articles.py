#!/usr/bin/env python3
import os
import re

def fix_new_style_article(file_path):
    """Fix new style articles that use only Tailwind CSS"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if it's a new style article (has Tailwind but no custom nav-menu CSS)
        if 'tailwindcss.com' not in content:
            print(f"Skipping {file_path} - not a Tailwind article")
            return False
            
        if 'Force correct mobile navigation display' in content:
            print(f"Skipping {file_path} - already fixed")
            return False
        
        # Find the end of the last CSS rule before </style>
        css_insertion_point = r'(\s*)(</style>)'
        
        css_fix = '''        
        /* Force correct mobile navigation display */
        @media (max-width: 767px) {
            .nav-menu {
                display: none !important;
            }
            
            #mobile-menu-button {
                display: block !important;
            }
        }
        
        @media (min-width: 768px) {
            .nav-menu {
                display: flex !important;
            }
            
            #mobile-menu-button {
                display: none !important;
            }
            
            #mobile-menu {
                display: none !important;
            }
        }'''
        
        # Insert CSS fix before </style>
        updated_content = re.sub(css_insertion_point, css_fix + r'\n\1\2', content)
        
        if updated_content == content:
            print(f"No CSS insertion point found in {file_path}")
            return False
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
            
        print(f"Successfully fixed {file_path}")
        return True
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Fix new style articles"""
    new_style_articles = [
        '/Users/macbookpro/Claude/vive-blog/public/articles/20250819.html',
        '/Users/macbookpro/Claude/vive-blog/public/articles/20250820.html', 
        '/Users/macbookpro/Claude/vive-blog/public/articles/20250821.html',
        '/Users/macbookpro/Claude/vive-blog/public/articles/20250822.html'
    ]
    
    successful_updates = 0
    
    for file_path in new_style_articles:
        if os.path.exists(file_path):
            filename = os.path.basename(file_path)
            print(f"Processing {filename}...")
            
            if fix_new_style_article(file_path):
                successful_updates += 1
        else:
            print(f"File not found: {file_path}")
    
    print(f"\nCompleted: {successful_updates} new style articles fixed")

if __name__ == "__main__":
    main()