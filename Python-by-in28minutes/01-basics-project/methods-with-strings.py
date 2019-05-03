message = "Hello World"

message.upper()         # minden karakter nagybetű lesz

message.lower()         # minden karakter kisbetű lesz

message.capitalize()    # az első nagy, a többi kisbetű lesz

message.islower()       # true, ha minden betű kicsi

message.isupper()       # true, ha minden betű nagy

message.istitle()       # true, ha csak az első betű nagy

message.isdigit()       # true, ha csak számból áll

message.isalpha()       # true, ha csak betűből áll

message.isalnum()       # true, ha csak számból és betűből áll (! space pl nem az!!)

message.endswith('World')   # true, ha pont így végződik (case sensitive)

message.startswith('He')    # true, ha pont így kezdődik (case sensitive)

message.find('Hello')       # ha benne van, visszaadja a kezdő betű indexét, ha nincs, '-1'-et
