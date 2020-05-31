var documenterSearchIndex = {"docs":
[{"location":"guide/#Usage-Guide-1","page":"Usage Guide","title":"Usage Guide","text":"","category":"section"},{"location":"guide/#Installation-1","page":"Usage Guide","title":"Installation","text":"","category":"section"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"You can install NarrativeTest using the Julia package manager:","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"julia> using Pkg\njulia> Pkg.add(\"NarrativeTest\")","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"Alternatively, you can install it from the GitHub repository using Pkg.clone():","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"julia> Pkg.clone(\"https://github.com/rbt-lang/NarrativeTest.jl\")","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"To use NarrativeTest for testing your package, add it as a test-specific dependency and create the following test/runtests.jl script in the package directory:","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"#!/usr/bin/env julia\n\nusing NarrativeTest\nruntests()","category":"page"},{"location":"guide/#Creating-tests-1","page":"Usage Guide","title":"Creating tests","text":"","category":"section"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"Write the test suite as a Markdown document and save it in the test directory.  Place the test cases in Markdown code blocks, and use comments #-> … and #=> … =# to indicate the expected output.  For example:","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"# Sample test suite\n\nVerify that the expression evaluates to the expected value:\n\n    6(3+4)          #-> 42\n\nCheck if the code produces the expected output:\n\n    print(\"Hello \")\n    print(\"World!\")\n    #-> Hello World!\n\nAbbreviate the output with ellipsis:\n\n    collect('a':'z')\n    #-> ['a', 'b', …, 'z']\n\n    display(collect('a':'z'))\n    #=>\n    26-element Array{Char,1}:\n     'a'\n     'b'\n     ⋮\n     'z'\n    =#\n\nRun the test conditionally:\n\n    #? Sys.WORD_SIZE == 64\n    Int             #-> Int64","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"To suppress the printing of the value produced by the test case, end it with ;.","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"In the output block, you can use the symbol … (\\dots) to match an arbitrary sequence of characters in the line, and ⋮ (\\vdots) to match any number of lines.","category":"page"},{"location":"guide/#Running-the-tests-1","page":"Usage Guide","title":"Running the tests","text":"","category":"section"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"To run all test suites in the test directory, start:","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"$ julia ./test/runtests.jl\nTests passed: 3\nTESTING SUCCESSFUL!","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"You can also run individual test suites by listing them as command-line parameters:","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"$ julia ./test/runtests.jl path/to/test.md","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"Alternatively, you can run any test suite from Julia:","category":"page"},{"location":"guide/#","page":"Usage Guide","title":"Usage Guide","text":"julia> using NarrativeTest\njulia> success = runtests([\"path/to/test.md\"]);\nTests passed: 3\nTESTING SUCCESSFUL!\njulia> success\ntrue","category":"page"},{"location":"test/#Test-Suite-1","page":"Test Suite","title":"Test Suite","text":"","category":"section"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"This is the test suite for NarrativeTest.jl.  We start with importing its public API.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"using NarrativeTest","category":"page"},{"location":"test/#Running-the-tests-1","page":"Test Suite","title":"Running the tests","text":"","category":"section"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"The main entry point of NarrativeTest is the function runtests(), which takes a list of Markdown files.  Each file is parsed to extract and run the embedded test suite.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"ans = runtests([\"sample_good.md_\"]);\n#=>\nTests passed: 3\nTESTING SUCCESSFUL!\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"If all tests pass, runtests() returns true.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"ans\n#-> true","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"If any of the tests fail or an ill-formed test case is detected, runtests() reports the problem and returns false.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"ans = runtests([\"sample_bad.md_\"]);\n#=>\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTest failed at sample_bad.md_, line 9:\n    2+2\nExpected output:\n    5\nActual output:\n    4\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTest failed at sample_bad.md_, line 13:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\nActual output:\n    ERROR: DomainError …\n    sqrt will only return a complex result if called with a complex argument. …\n    Stacktrace:\n     ⋮\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nError at sample_bad.md_, line 17:\n    missing test code\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTests passed: 1\nTests failed: 2\nErrors: 1\nTESTING UNSUCCESSFUL!\n=#\n\nans\n#-> false","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"To implement the runtests.jl script, invoke runtests() without arguments. In this form, runtests() gets the list of files from command-line parameters and, after testing is done, terminates the process with an appropriate exit code.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"julia = Base.julia_cmd()\n\nrun(`$julia -e 'using NarrativeTest; runtests()' sample_good.md_`);\n#=>\n⋮\nTESTING SUCCESSFUL!\n=#\n\nrun(`$julia -e 'using NarrativeTest; runtests()' sample_bad.md_`);\n#=>\n⋮\nTESTING UNSUCCESSFUL!\nERROR: failed process: Process(` … `, ProcessExited(1)) [1]\n=#","category":"page"},{"location":"test/#Extracting-test-cases-1","page":"Test Suite","title":"Extracting test cases","text":"","category":"section"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"We can extract individual test cases from Markdown and Julia files.  Let us import the respective API.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"using NarrativeTest:\n    parsejl,\n    parsemd","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"Function parsemd() parses the given Markdown file and returns an array of the extracted test cases.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(\"sample_bad.md_\")\nforeach(display, suite)\n#=>\nTest case at sample_bad.md_, line 5:\n    (3+4)*6\nExpected output:\n    42\nTest case at sample_bad.md_, line 9:\n    2+2\nExpected output:\n    5\nTest case at sample_bad.md_, line 13:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\nError at sample_bad.md_, line 17:\n    missing test code\n=#\n\nsuite = parsemd(\"sample_missing.md_\")\nforeach(display, suite)\n#=>\nError at sample_missing.md_:\n    SystemError: …\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"Function parsemd() recognizes two types of Markdown code blocks: indented and fenced.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        These test cases are embedded in an indented code block.\n\n            (3+4)*6\n            $(\"#->\") 42\n\n            2+2\n            $(\"#->\") 5\n\n        The following test cases are embedded in a fenced code block.\n        ```\n        print(2^16)\n        $(\"#->\") 65526\n\n        sqrt(-1)\n        $(\"#->\") 0.0 + 1.0im\n        ```\n        \"\"\"))\nforeach(display, suite)\n#=>\nTest case at <input>, line 3:\n    (3+4)*6\nExpected output:\n    42\nTest case at <input>, line 6:\n    2+2\nExpected output:\n    5\nTest case at <input>, line 11:\n    print(2^16)\nExpected output:\n    65526\nTest case at <input>, line 14:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"A fenced code block with an explicit language indicator is ignored.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"parsemd(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        The following code will not be tested.\n        ```julia\n        2 + 2   $(\"#->\") 5\n        ```\n        \"\"\"))\n#-> NarrativeTest.AbstractTest[]","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"It is an error if a fenced code block is not closed.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        Incomplete fenced code block is an error.\n        ```\n        (3+4)*6\n        $(\"#->\") 42\n        \"\"\"))\nforeach(display, suite)\n#=>\nError at <input>, line 2:\n    incomplete fenced code block\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"Function parsejl() parses a Julia file and returns an array of the extracted test cases.  It recognizes #? as a precondition and #-> … and #=> ⋮ =# as single-line and multi-line expected output.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        2+2     $(\"#->\") 4\n\n        print(2^16)\n        $(\"#->\") 65526\n\n        display(collect('A':'Z'))\n        $(\"#=>\")\n        26-element Array{Char,1}:\n         'A'\n         'B'\n         ⋮\n         'Z'\n        =#\n\n        $(\"#?\") Sys.WORD_SIZE == 64\n        Int     $(\"#->\") Int64\n        \"\"\"))\nforeach(display, suite)\n#=>\nTest case at <input>, line 1:\n    2+2\nExpected output:\n    4\nTest case at <input>, line 3:\n    print(2^16)\nExpected output:\n    65526\nTest case at <input>, line 6:\n    display(collect('A':'Z'))\nExpected output:\n    26-element Array{Char,1}:\n     'A'\n     'B'\n     ⋮\n     'Z'\nTest case at <input>, line 15:\n    Int\nPrecondition:\n    Sys.WORD_SIZE == 64\nExpected output:\n    Int64\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"A test case may have no expected output.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        x = pi/6\n        y = sin(x)\n\n        @assert y ≈ 0.5\n        \"\"\"))\nforeach(display, suite)\n#=>\nTest case at <input>, line 1:\n    x = pi/6\n    y = sin(x)\n\n    @assert y ≈ 0.5\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"However, it is an error to have an expected output block without any test code.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        $(\"#->\") 42\n        \"\"\"))\nforeach(display, suite)\n#=>\nError at <input>, line 1:\n    missing test code\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"It is also an error if a multi-line output block is not closed.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    \"<input>\",\n    IOBuffer(\"\"\"\n        display(collect('A':'Z'))\n        $(\"#=>\")\n        26-element Array{Char,1}:\n         'A'\n         'B'\n         ⋮\n         'Z'\n        \"\"\"))\nforeach(display, suite)\n#=>\nError at <input>, line 2:\n    incomplete multiline comment block\n=#","category":"page"},{"location":"test/#Running-one-test-1","page":"Test Suite","title":"Running one test","text":"","category":"section"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"We can run individual tests using the function runtest().","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"using NarrativeTest:\n    runtest","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"Function runtest() takes a test case object and returns the test result.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(\"sample_bad.md_\")\nsuite = filter(t -> t isa NarrativeTest.Test, suite)\nresults = map(runtest, suite)\nforeach(display, results)\n#=>\nTest passed at sample_bad.md_, line 5:\n    (3+4)*6\nExpected output:\n    42\nActual output:\n    42\nTest failed at sample_bad.md_, line 9:\n    2+2\nExpected output:\n    5\nActual output:\n    4\nTest failed at sample_bad.md_, line 13:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\nActual output:\n    ERROR: DomainError …:\n    …\n    Stacktrace:\n    ⋮\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"runtest() captures the content of the standard output and error streams and matches it against the expected test result.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"\"\"println(\"Hello World!\")\\n\"\"\", expect=\"Hello World!\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    println(\"Hello World!\")\nExpected output:\n    Hello World!\nActual output:\n    Hello World!\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"runtest() shows the value produced by the last statement of the test code.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"(3+4)*6\\n\", expect=\"42\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    (3+4)*6\nExpected output:\n    42\nActual output:\n    42\n=#\n\nresult = runtest(\"<input>\", \"2+2\\n\", expect=\"5\\n\")\ndisplay(result)\n#=>\nTest failed at <input>:\n    2+2\nExpected output:\n    5\nActual output:\n    4\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"However, if this value is equal to nothing, it is not displayed.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"nothing\\n\", expect=\"\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    ⋮\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"This value is also concealed if the test code ends with ; of if the test case has no expected output.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"(3+4)*6;\\n\", expect=\"\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    ⋮\n=#\n\nresult = runtest(\"<input>\", \"(3+4)*6\\n\", expect=nothing)\ndisplay(result)\n#=>\nTest passed at <input>:\n    ⋮\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"A test case may include a precondition.  When the precondition is evaluated to false, the test case is skipped.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"2+2\\n\", pre=\"0 < 1\\n\", expect=\"4\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    2+2\nExpected output:\n    4\nActual output:\n    4\n=#\n\nresult = runtest(\"<input>\", \"2+2\\n\", pre=\"0 >= 1\\n\", expect=\"5\\n\")\ndisplay(result)\n#=>\nTest skipped at <input>:\n    2+2\nFailed precondition:\n    0 >= 1\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"The precondition must always produce a Boolean value.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"2+2\\n\", pre=\"1\\n\", expect=\"4\\n\")\ndisplay(result)\n#=>\nTest failed at <input>:\n    2+2\nExpected output:\n    4\nActual output:\n    ERROR: TypeError: non-boolean (Int64) used in boolean context\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"Functions include and eval are available in the test code.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"include(\\\"included.jl\\\")\", expect=\"Hello from included.jl!\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    include(\"included.jl\")\nExpected output:\n    Hello from included.jl!\nActual output:\n    Hello from included.jl!\n=#\n\nresult = runtest(\"<input>\", \"eval(:(print(\\\"Hello from eval!\\\")))\", expect=\"Hello from eval!\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    eval(:(print(\"Hello from eval!\")))\nExpected output:\n    Hello from eval!\nActual output:\n    Hello from eval!\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"When the test raises an exception, the error message (but not the stack trace) is included with the output.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"sqrt(-1)\\n\", expect=\"ERROR: DomainError …\\n …\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    sqrt(-1)\nExpected output:\n    ERROR: DomainError …\n     …\nActual output:\n    ERROR: DomainError …\n    sqrt will only return a complex result if called with a complex argument. …\n=#","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"In the expected output, we can use symbol … to match any number of characters in a line, and symbol ⋮ to match any number of lines.","category":"page"},{"location":"test/#","page":"Test Suite","title":"Test Suite","text":"result = runtest(\"<input>\", \"print(collect('A':'Z'))\\n\", expect=\"['A', 'B', …, 'Z']\\n\")\ndisplay(result)\n#=>\nTest passed at <input>:\n    print(collect('A':'Z'))\nExpected output:\n    ['A', 'B', …, 'Z']\nActual output:\n    ['A', 'B', 'C', …, 'Y', 'Z']\n=#\n\nresult = runtest(\"<input>\", \"display(collect('A':'Z'))\\n\", expect=\"26-element Array{Char,1}:\\n ⋮\\n\")\n\n#? VERSION < v\"1.5.0-DEV\"\ndisplay(result)\n#=>\nTest passed at <input>:\n    display(collect('A':'Z'))\nExpected output:\n    26-element Array{Char,1}:\n     ⋮\nActual output:\n    26-element Array{Char,1}:\n     'A'\n     'B'\n     ⋮\n     'Z'\n=#\n\n#? VERSION >= v\"1.5.0-DEV\"\ndisplay(result)\n#=>\nTest passed at <input>:\n    display(collect('A':'Z'))\nExpected output:\n    26-element Array{Char,1}:\n     ⋮\nActual output:\n    26-element Array{Char,1}:\n     'A': ASCII/Unicode U+0041 (category Lu: Letter, uppercase)\n     'B': ASCII/Unicode U+0042 (category Lu: Letter, uppercase)\n     ⋮\n     'Z': ASCII/Unicode U+005A (category Lu: Letter, uppercase)\n=#","category":"page"},{"location":"reference/#API-Reference-1","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"reference/#","page":"API Reference","title":"API Reference","text":"NarrativeTest.runtests\nNarrativeTest.runtest\nNarrativeTest.parsemd\nNarrativeTest.parsejl","category":"page"},{"location":"reference/#NarrativeTest.runtests","page":"API Reference","title":"NarrativeTest.runtests","text":"runtests(files) :: Bool\n\nLoads the specified Markdown files to extract and run the embedded test cases. When a directory is passed, loads all *.md files in the directory. Returns true if the testing is successful, false otherwise.\n\nruntests()\n\nIn this form, test files are specified as command-line parameters.  When invoked without parameters, loads all *.md files in the program directory. Exits with code 0 if the testing is successful, 1 otherwise.  Use this form in test/runtests.jl:\n\nusing NarrativeTest\nruntests()\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.runtest","page":"API Reference","title":"NarrativeTest.runtest","text":"runtest(test::Test) :: AbstractResult\nruntest(loc, code; pre=nothing, expect=nothing) :: AbstractResult\n\nRuns the given test case, returns the result.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.parsemd","page":"API Reference","title":"NarrativeTest.parsemd","text":"parsemd(file) :: Vector{AbstractTest}\nparsemd(name, io) :: Vector{AbstractTest}\n\nParses the specified Markdown file to extract the embedded test suite.  Returns a list of test cases.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.parsejl","page":"API Reference","title":"NarrativeTest.parsejl","text":"parsejl(file) :: Vector{AbstractTest}\nparsejl(name, io) :: Vector{AbstractTest}\n\nLoads the specified Julia source file and extracts the embedded test suite. Returns a list of test cases.\n\n\n\n\n\n","category":"function"},{"location":"#NarrativeTest.jl-Documentation-1","page":"Home","title":"NarrativeTest.jl Documentation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"NarrativeTest is a Julia library for functional testing, which lets you write the test suite in the narrative form.  It permits you to describe the behavior of software components in the Markdown format, and then extract, execute, and validate any embedded test code.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"NarrativeTest can be compared to the Doctest module (see also Documenter.jl). It differs from Doctest in its approach to syntax: instead of presenting the test suite as a part of an interactive session, NarrativeTest uses plain code blocks with expected output in comments.  It also focuses less on docstrings and documentation examples, and more on validating the ergonomics of API with \"literate testing\".","category":"page"},{"location":"#Contents-1","page":"Home","title":"Contents","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\n    \"guide.md\",\n    \"reference.md\",\n    \"test.md\",\n]","category":"page"},{"location":"#Index-1","page":"Home","title":"Index","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"}]
}
