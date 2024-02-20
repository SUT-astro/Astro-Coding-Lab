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

    def read_h2_name(self, html_name):
        project_html_path = r'{0}\{1}'.format(self.project_path, html_name)     # path of .html file

        with open(project_html_path, encoding='utf8') as fp:
            # import html file
            soup = BeautifulSoup(fp, 'html.parser')
            
        h2_path = soup.main.section.div.div.h2

        h2_string = h2_path.contents
        h2_character = [item.strip() for item in h2_string if str(item)]
        return h2_character

    def get_all_h2_name(self):

        project_all_files = os.listdir(self.project_path)

        project_html = [i for i in project_all_files if i[-5:] == '.html']      # all .html file
        project_module = [i for i in project_html if i[:6] == 'module']         # all module.html
        
        h2_all_name = [self.read_h2_name(html_name = i)[0] for i in project_module]     # all <h2> elements

        module_chapter = [i[:8] for i in project_module]

        unique_name, unique_index, unique_counts = np.unique(module_chapter,
                                                             return_index=True,
                                                             return_counts=True)

        # module's name: [its correspondent .html names, and <h2> elements]
        module_dict = dict([(j, [list(zip(project_module[unique_index[i]:unique_index[i] + unique_counts[i]],
                                          h2_all_name[unique_index[i]:unique_index[i] + unique_counts[i]]))
                                 ])
                            for i, j in enumerate(unique_name)])

        for i, j in module_dict.items():
            print(i, j)

        return module_dict

# choose target project
project_1_scraper = project_html_scraper(target_project = all_project_folder[0])

# search all <h2> content in .html file
project_1_header = project_1_scraper.get_all_h2_name()
