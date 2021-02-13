import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/mutable_product.dart';
import '../providers/products_provider.dart';

class EditProductScreen extends StatefulWidget {
  static const routeName = '/edit';

  @override
  _EditProductScreenState createState() => _EditProductScreenState();
}

class _EditProductScreenState extends State<EditProductScreen> {
  TextEditingController _imageUrlController = TextEditingController();
  FocusNode _imageUrlFocusNode = FocusNode();
  GlobalKey<FormState> _form = GlobalKey<FormState>();
  MutableProduct _editedProduct = MutableProduct(
      id: null, title: '', description: '', price: 0, imageUrl: '');
  bool _isInitialLoad = true;
  bool _isLoading = false;
  Map<String, String> _initValues = {
    'title': '',
    'price': '',
    'description': '',
    'imageUrl': ''
  };

  void _updateImageUrl() {
    if (!_imageUrlController.text.startsWith('http') &&
        !_imageUrlController.text.endsWith('.jpg') &&
        !_imageUrlController.text.endsWith('.png')) {
      return;
    }
    if (!_imageUrlFocusNode.hasFocus) {
      setState(() {});
    }
  }

  void _saveForm() async {
    final isValid = _form.currentState.validate();
    if (!isValid) return;
    final products = Provider.of<Products>(context, listen: false);

    _form.currentState.save();

    setState(() {
      _isLoading = true;
    });

    try {
      if (_editedProduct.id != null) {
        await products.updateProduct(_editedProduct);
      } else {
        await products.addProduct(_editedProduct);
      }
    } catch (e) {
      print(e);
      await showDialog(context: context, builder: (ctx) => AlertDialog(
        title: Text('An error occurred'),
        content: Text('Something went wrong...'),
        actions: [
          FlatButton(
            child: Text('OK'),
            onPressed: () {
              Navigator.of(ctx).pop();
            },
          ),
        ],
      ));
    } finally {
      setState(() {
        _isLoading = false;
      });
      Navigator.of(context).pop();
    }

  }

  @override
  void initState() {
    _imageUrlFocusNode.addListener(_updateImageUrl);
    super.initState();
  }

  @override
  void didChangeDependencies() {
    if (_isInitialLoad) {
      final productId = ModalRoute.of(context).settings.arguments as String;
      if (productId != null) {
        final product =
            Provider.of<Products>(context, listen: false).findById(productId);
        _editedProduct = MutableProduct(
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
            isFavorite: product.isFavorite);
        _initValues = {
          'title': product.title,
          'price': product.price.toString(),
          'description': product.description,
          'imageUrl': ''
        };
        _imageUrlController.text = product.imageUrl;
      }
      _isInitialLoad = false;
    }
    super.didChangeDependencies();
  }

  @override
  void dispose() {
    _imageUrlController.dispose();
    _imageUrlFocusNode.removeListener(_updateImageUrl);
    _imageUrlFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Product'),
        actions: [IconButton(icon: Icon(Icons.save), onPressed: _saveForm)],
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _form,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      TextFormField(
                        initialValue: _initValues['title'],
                        decoration: InputDecoration(
                          labelText: 'Title',
                        ),
                        textInputAction: TextInputAction.next,
                        validator: (value) {
                          if (value.isEmpty) {
                            return 'Please provide a title.';
                          }
                          return null; // input is correct
                        },
                        onEditingComplete: () {
                          _form.currentState.validate();
                        },
                        onSaved: (value) {
                          _editedProduct.title = value;
                        },
                      ),
                      TextFormField(
                        initialValue: _initValues['price'],
                        decoration: InputDecoration(
                          labelText: 'Price',
                        ),
                        keyboardType: TextInputType.number,
                        textInputAction: TextInputAction.next,
                        validator: (value) {
                          if (value.isEmpty) {
                            return 'Please enter a price';
                          }
                          double parsed = double.tryParse(value);
                          if (parsed == null || parsed <= 0) {
                            return 'Please enter a valid price';
                          }
                          return null; // input is correct
                        },
                        onSaved: (value) {
                          _editedProduct.price = double.parse(value);
                        },
                        onEditingComplete: () {
                          _form.currentState.validate();
                        },
                      ),
                      TextFormField(
                        initialValue: _initValues['description'],
                        decoration: InputDecoration(
                          labelText: 'Description',
                        ),
                        maxLines: 3,
                        keyboardType: TextInputType.multiline,
                        validator: (value) {
                          if (value.isEmpty) {
                            return 'Please enter a description.';
                          }
                          return null; // input is correct
                        },
                        onEditingComplete: () {
                          _form.currentState.validate();
                        },
                        onSaved: (value) {
                          _editedProduct.description = value;
                        },
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Container(
                            width: 100,
                            height: 100,
                            margin: EdgeInsets.only(top: 8, right: 12),
                            decoration: BoxDecoration(
                                border:
                                    Border.all(width: 1, color: Colors.grey)),
                            child: _imageUrlController.text.isEmpty
                                ? Center(
                                    child: Text(
                                    'Enter a URL',
                                    style: TextStyle(
                                      color: Colors.grey,
                                      fontStyle: FontStyle.italic,
                                    ),
                                  ))
                                : FittedBox(
                                    child: Image.network(
                                      _imageUrlController.text,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                          ),
                          Expanded(
                            child: TextFormField(
                              decoration: InputDecoration(
                                labelText: 'Image URL',
                              ),
                              keyboardType: TextInputType.url,
                              textInputAction: TextInputAction.done,
                              controller: _imageUrlController,
                              focusNode: _imageUrlFocusNode,
                              validator: (value) {
                                if (value.isEmpty) {
                                  return 'Please enter an image URL.';
                                }
                                if (!value.startsWith('http') &&
                                    !value.endsWith('.jpg') &&
                                    !value.endsWith('.png')) {
                                  return 'Please enter a valid URL.';
                                }
                                return null; // input is correct
                              },
                              onSaved: (value) {
                                _editedProduct.imageUrl = value;
                              },
                              onEditingComplete: () {
                                _form.currentState.validate();
                                setState(() {});
                              },
                              onFieldSubmitted: (value) {
                                _saveForm();
                              },
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
    );
  }
}
