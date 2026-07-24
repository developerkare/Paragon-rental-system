import zipfile
import xml.etree.ElementTree as ET
import json

excel_file = r'c:\Users\Hp\Paragon-rental-system\KCNA Prep - Quiz Materials (1).xlsx'

try:
    with zipfile.ZipFile(excel_file, 'r') as zip_ref:
        # Read shared strings (all text values)
        strings_xml = zip_ref.read('xl/sharedStrings.xml')
        strings_root = ET.fromstring(strings_xml)
        strings = []
        for si in strings_root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            t_elem = si.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
            if t_elem is not None:
                strings.append(t_elem.text if t_elem.text else "")
        
        print(f"Total strings: {len(strings)}\n")
        
        # Get workbook structure to see all sheets
        workbook_xml = zip_ref.read('xl/workbook.xml')
        wb_root = ET.fromstring(workbook_xml)
        sheets_info = wb_root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheets/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet')
        
        print(f"Found {len(sheets_info)} sheets:")
        for sheet in sheets_info:
            print(f"  - {sheet.get('name')}")
        
        # Extract from all sheets
        all_quiz_data = []
        
        for sheet_idx in range(1, len(sheets_info) + 1):
            try:
                worksheet_xml = zip_ref.read(f'xl/worksheets/sheet{sheet_idx}.xml')
                ws_root = ET.fromstring(worksheet_xml)
                
                rows = ws_root.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
                
                sheet_name = sheets_info[sheet_idx - 1].get('name')
                print(f"\n=== Processing Sheet {sheet_idx}: {sheet_name} ===")
                
                # Parse rows starting from row 2 (skip header)
                for row_idx, row in enumerate(rows[1:], start=1):
                    cells = row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')
                    
                    # Extract cell values
                    row_values = []
                    for cell in cells:
                        t_elem = cell.get('t')
                        val_elem = cell.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                        
                        if val_elem is not None and val_elem.text:
                            if t_elem == 's':  # String type
                                try:
                                    string_index = int(val_elem.text)
                                    if string_index < len(strings):
                                        row_values.append(strings[string_index])
                                    else:
                                        row_values.append("")
                                except:
                                    row_values.append("")
                            else:
                                row_values.append(val_elem.text)
                        else:
                            row_values.append("")
                    
                    # Ensure we have enough columns
                    while len(row_values) < 10:
                        row_values.append("")
                    
                    # Parse question data
                    if row_values[1]:  # If Question column (index 1) has data
                        # Filter out empty options
                        options = [
                            {"label": "A", "text": row_values[2]} if row_values[2] else None,
                            {"label": "B", "text": row_values[3]} if row_values[3] else None,
                            {"label": "C", "text": row_values[4]} if row_values[4] else None,
                            {"label": "D", "text": row_values[5]} if row_values[5] else None,
                            {"label": "E", "text": row_values[6]} if row_values[6] else None,
                        ]
                        options = [opt for opt in options if opt is not None]
                        
                        question_obj = {
                            "id": len(all_quiz_data) + 1,
                            "section": sheet_name,
                            "question": row_values[1],
                            "options": options,
                            "correctAnswer": row_values[7] if row_values[7] else "",
                            "explanation": row_values[8] if row_values[8] else ""
                        }
                        all_quiz_data.append(question_obj)
                
                print(f"Extracted {sum(1 for q in all_quiz_data if q['section'] == sheet_name)} questions from {sheet_name}")
            
            except Exception as e:
                print(f"Could not read sheet {sheet_idx}: {e}")
        
        print(f"\n\n{'='*50}")
        print(f"TOTAL QUESTIONS EXTRACTED: {len(all_quiz_data)}")
        print(f"{'='*50}")
        
        # Save to JSON file
        json_file = r'c:\Users\Hp\Paragon-rental-system\quiz_data_all_sections.json'
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(all_quiz_data, f, indent=2, ensure_ascii=False)
        
        print(f"\nQuiz data saved to: {json_file}")
        
        # Print summary by section
        print(f"\nQuestions by Section:")
        sections = {}
        for q in all_quiz_data:
            section = q.get('section', 'Unknown')
            sections[section] = sections.get(section, 0) + 1
        
        for section, count in sections.items():
            print(f"  {section}: {count} questions")

except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
