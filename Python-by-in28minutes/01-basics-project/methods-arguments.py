def example_method(mandatory_parameter, default_parameter="Default", *args, **kwargs):
    # *args = variable parameter, **kwargs = keyword parameter

    print(f"""
        mandatory_parameter = {mandatory_parameter}, type : {type(mandatory_parameter)}
        default_parameter = {default_parameter}, type : {type(default_parameter)}
        args = {args}, type : {type(args)}
        kwargs = {kwargs}, type : {type(kwargs)}
        """)


example_method(15)
example_method(mandatory_parameter=15)
# mandatory_parameter will be 15, default remains "Default", the rest is empty

example_method(25, 'string 1', 'string 2', 'string 3', 'string 4')
# strings 2-3-4 will go to ARGS parameter as a TUPLE!!!
# this is one of the ways to pass multiple values into one argument

example_method(25, 'string 1', 'string 2', 'string 3', key1='string 4', key2='string5')
# string 1 overrides default_parameter, string 2-3 will be tuple in ARGS parameter, and
# string 4-5 will be in KWARGS as a dictionary, with keys

# passing elements of a list and a dictionary as arguments:
example_list = [1, 2, 3, 4, 5, 6]
example_dict = {'key1' : 'string 1', 'key2' : 'string 2'}
example_method(*example_list, **example_dict)
# *listname : unpacking a list
# **dictname : unpacking a dictionary
# result will be same as example_method(1, 2, 3, 4, 5, 6, 'key1' : 'string 1', 'key2' : 'string 2')

