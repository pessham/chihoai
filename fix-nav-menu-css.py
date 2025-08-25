#!/usr/bin/env python3
import os
import re
import glob

def fix_nav_menu_css(file_path):
    """Fix nav-menu CSS conflicts with Tailwind in a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already fixed
        if 'nav-menu.hidden' in content:
            print(f"Skipping {file_path} - already fixed")
            return False
            
        # Find and replace the problematic nav-menu CSS
        old_nav_css = r'(\s*)\.nav-menu\s*\{\s*display:\s*flex;\s*gap:\s*2rem;\s*align-items:\s*center;\s*\}'
        
        new_nav_css = r'''\1.nav-menu {
\1    gap: 2rem;
\1    align-items: center;
\1}
\1
\1/* Desktop navigation display */
\1.nav-menu.hidden {
\1    display: none !important;
\1}
\1
\1@media (min-width: 768px) {
\1    .nav-menu {
\1        display: flex !important;
\1    }
\1}'''
        
        # Update content
        updated_content = re.sub(old_nav_css, new_nav_css, content, flags=re.MULTILINE | re.DOTALL)
        
        if updated_content == content:
            print(f"No nav-menu CSS found to replace in {file_path}")
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
    """Process all HTML files in articles directory"""
    articles_dir = '/Users/macbookpro/Claude/vive-blog/public/articles'
    html_files = glob.glob(os.path.join(articles_dir, '*.html'))
    
    successful_updates = 0
    total_files = len(html_files)
    
    print(f"Processing {total_files} HTML files...")
    
    for file_path in sorted(html_files):
        filename = os.path.basename(file_path)
        print(f"Processing {filename}...")
        
        if fix_nav_menu_css(file_path):
            successful_updates += 1
    
    print(f"\nCompleted: {successful_updates}/{total_files} files updated successfully")

if __name__ == "__main__":
    main()