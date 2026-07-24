import zipfile
import xml.etree.ElementTree as ET
import json
from pathlib import Path

excel_file = r'c:\Users\Hp\Paragon-rental-system\KCNA Prep - Quiz Materials (1).xlsx'

try:
    with zipfile.ZipFile(excel_file, 'r') as zip_ref:
        # Get workbook structure
        workbook_xml = zip_ref.read('xl/workbook.xml')
        root = ET.fromstring(workbook_xml)
        
        # Extract sheet names
        namespaces = {'': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        sheets = root.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet')
        
        print(f"Found {len(sheets)} sheets:")
        for sheet in sheets:
            print(f"  - {sheet.get('name')}")
        
        # Now read the first worksheet
        worksheet_xml = zip_ref.read('xl/worksheets/sheet1.xml')
        ws_root = ET.fromstring(worksheet_xml)
        
        print("\n=== Sheet 1 Content ===")
        rows = ws_root.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        
        for row_idx, row in enumerate(rows[:30], 1):
            cells = row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')
            row_data = []
            for cell in cells:
                val_elem = cell.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                if val_elem is not None and val_elem.text:
                    row_data.append(val_elem.text)
            if row_data:
                print(f"Row {row_idx}: {row_data}")
        
        # Try to get shared strings (for text values)
        try:
            strings_xml = zip_ref.read('xl/sharedStrings.xml')
            strings_root = ET.fromstring(strings_xml)
            strings = []
            for si in strings_root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                t_elem = si.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
                if t_elem is not None:
                    strings.append(t_elem.text)
            
            print(f"\n\nFound {len(strings)} shared strings:")
            for i, s in enumerate(strings[:50]):
                print(f"  [{i}] {s}")
        except Exception as e:
            print(f"Could not read shared strings: {e}")

except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
