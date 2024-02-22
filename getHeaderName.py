'''
For scraping the content of .html file in the 'project' folder
'''

import os
import numpy as np
from bs4 import BeautifulSoup

all_project_folder = ['project-1-brown-dwarf', 'project-2-Time-series']

class project_html_scraper(object):
    
    def __init__(self, target_project):
        self.this_folder_path = os.getcwd()     # path of this directory
        self.project_path = r'{0}\{1}'.format(self.this_folder_path, target_project)    # path of project's folder

    def read_h_name(self, html_name, h_level):
        project_html_path = r'{0}\{1}'.format(self.project_path, html_name)     # path of .html file

        with open(project_html_path, encoding='utf8') as fp:
            # import html file
            soup = BeautifulSoup(fp, 'html.parser')
            
        if h_level == 'h1':
            h_path = soup.main.section.div.div.h1
            
        elif h_level == 'h2':
            h_path = soup.main.section.div.div.h2
            
        else:
            raise Exception('Undefined h level')

        h_string = h_path.contents
        h_character = [item.strip() for item in h_string if str(item)]
        return h_character

    def get_all_h_name(self):
        project_all_files = os.listdir(self.project_path)

        project_html = [i for i in project_all_files if i[-5:] == '.html']      # all .html file
        project_module = [i for i in project_html if i[:6] == 'module']         # all module.html

        h1_all_name = [self.read_h_name(html_name = i,
                                        h_level = 'h1')[0] for i in project_module]
        h1_unique_name = np.unique(h1_all_name,
                                   return_index=False,
                                   return_counts=False)    # all <h1> element
        
        h2_all_name = [self.read_h_name(html_name = i,
                                        h_level = 'h2')[0] for i in project_module]     # all <h2> elements

        module_chapter = [i[:8] for i in project_module]

        unique_name, unique_index, unique_counts = np.unique(module_chapter,
                                                             return_index=True,
                                                             return_counts=True)

        # module's name: [its correspondent .html names, and <h2> elements]
        self.module_dict = dict([('{0}:{1}'.format(j, h1_unique_name[i]),
                                  [list(k) for k in zip(project_module[unique_index[i]:unique_index[i] + unique_counts[i]],
                                                        h2_all_name[unique_index[i]:unique_index[i] + unique_counts[i]])])
                                 for i, j in enumerate(unique_name)])

        return self.module_dict

    def write_js_file(self):
        file_name = 'module-list.js'
        file_to_open = r'{0}\{1}'.format(self.project_path, file_name)

        file_open = open(file_to_open, 'w', encoding='utf-8')
        file_open.write('const moduleNameObject = %s;'%(self.module_dict))
        file_open.close()

# choose target project
project_1_scraper = project_html_scraper(target_project = all_project_folder[0])

# search all <h1> and <h2> content in .html file
project_1_header = project_1_scraper.get_all_h_name()

# write all <h1> and <h2> content in 'module-list.js' file
project_1_scraper.write_js_file()
