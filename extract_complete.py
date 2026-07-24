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
        
        print(f"Total strings: {len(strings)}")
        
        # Read worksheet
        worksheet_xml = zip_ref.read('xl/worksheets/sheet1.xml')
        ws_root = ET.fromstring(worksheet_xml)
        
        rows = ws_root.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        
        quiz_data = []
        
        # Parse rows starting from row 2 (skip header)
        for row_idx, row in enumerate(rows[1:], start=1):
            cells = row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')
            
            # Extract cell values
            row_values = []
            for cell in cells:
                # Check if it's a string reference or direct value
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
            
            # The structure is:
            # Col 0 = ID number
            # Col 1 = Question text
            # Col 2 = Option A
            # Col 3 = Option B  
            # Col 4 = Option C
            # Col 5 = Option D
            # Col 6 = Option E
            # Col 7 = Correct Answer letter
            # Col 8 = Explanation
            
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
                    "id": row_idx,
                    "question": row_values[1],
                    "options": options,
                    "correctAnswer": row_values[7] if row_values[7] else "",
                    "explanation": row_values[8] if row_values[8] else ""
                }
                quiz_data.append(question_obj)
                
                if row_idx <= 3:  # Print first 3 for verification
                    print(f"\nQuestion {row_idx}:")
                    print(f"  Q: {question_obj['question'][:80]}...")
                    print(f"  A: {question_obj['options'][0]['text'][:60] if question_obj['options'] else 'N/A'}...")
                    print(f"  Answer: {question_obj['correctAnswer']}")
        
        print(f"\n\nTotal questions extracted: {len(quiz_data)}")
        
        # Save to JSON file
        json_file = r'c:\Users\Hp\Paragon-rental-system\quiz_data.json'
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(quiz_data, f, indent=2, ensure_ascii=False)
        
        print(f"Quiz data saved to: {json_file}")
        
        # Print statistics
        print(f"\nQuiz Statistics:")
        print(f"- Total Questions: {len(quiz_data)}")
        if quiz_data:
            print(f"- First Question: {quiz_data[0]['question'][:60]}...")
            print(f"- Last Question: {quiz_data[-1]['question'][:60]}...")

except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
